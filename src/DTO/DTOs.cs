namespace ScarletAI.DTOs;
/// <summary>
/// DTOs are used to pass data between the Scarlet API and the Scarlet Wrapper.
/// </summary>
public record CreateUserDto {
    public string username { get; init; } = default!;
    public string password { get; init; } = default!;
    public string email { get; init; } = default!;
    public string? firstName { get; init; } = default!;
    public int? age { get; init; } = default!;
}

/// <summary>
/// DTOs are used to pass data between the Scarlet API and the Scarlet Wrapper.
/// </summary>
public record DeleteUserDto {
    public string id { get; init; } = default!;
    public string token { get; init; } = default!;
    public string refreshKey { get; init; } = default!;
    public string password { get; init; } = default!;
}

/// <summary>
/// DTOs are used to pass data between the Scarlet API and the Scarlet Wrapper.
/// </summary>
public record GlobalDto {
    public string? username { get; init; } = default!;
    public string password { get; init; } = default!;
    public string id { get; init; } = default!;
    public string? refreshKey { get; init; } = default!;
    public string? token { get; init; } = default!;
    public string? content { get; init; } = default!;
    public string? domain { get; init; } = default!;
    public string? expires_in { get; init; } = default!;
};
