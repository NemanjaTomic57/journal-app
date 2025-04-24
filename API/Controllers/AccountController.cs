using System;
using API.Exceptions;
using API.Objects;
using API.Objects.DTOs;
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
            UserName = dto.Username,
        };

        var result = await userManager.CreateAsync(user, dto.Password);

        if (!result.Succeeded) throw new BadRequestException(result.ToString());

        return Ok();
    }
}
