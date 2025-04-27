using System;
using System.Security.Claims;
using API.Exceptions;
using API.Objects;
using API.Objects.DTOs;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AccountController(UserManager<AppUser> userManager) : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult> Register(RegisterDto dto)
    {
        var user = new AppUser
        {
            UserName = dto.UserName,
        };

        var result = await userManager.CreateAsync(user, dto.Password);

        if (!result.Succeeded) throw new BadRequestException(result.ToString());

        return Ok();
    }

    [HttpPost("login")]
    public async Task<ActionResult> Login(LoginDto dto)
    {
        var user = await userManager.FindByNameAsync(dto.UserName);

        if (user == null || !await userManager.CheckPasswordAsync(user, dto.Password))
        {
            throw new UnauthorizedException("You are not authorized.");
        }

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Name, user.UserName!),
        };

        var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

        var authProperties = new AuthenticationProperties
        {
            IssuedUtc = DateTime.UtcNow,
        };

        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity), authProperties);

        return Ok();
    }
}
