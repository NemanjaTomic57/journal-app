using System;
using System.ComponentModel.DataAnnotations;

namespace API.Objects.DTOs;

public class RegisterDto
{
    [Required]
    public string UserName { get; set; } = string.Empty;

    [Required]
    public string Password { get; set; } = string.Empty;
}
