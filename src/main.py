import http.client as http

CreateUserDto = {
    "username": "string",
    "password": "string",
    "email": "string",
    "firstName": "string",
    "age": "int",
}

DeleteUserDto = {
    "id": "int",
    "token": "string",
    "refreshKey": "string",
    "password": "string",
}

UserDto = {
    "username": "string",
    "password": "string",
    "content": "string",
    "id": "int",
    "domain": "string",
    "token": "string",
    "refreshKey": "string",
}

class Scarlet:
    """
    CreateUserDto = {
        "username": "string",
        "password": "string",
        "email": "string",
        "firstName": "string",
        "age": "int",
    }

    UserDto = {
        "username": "string",
        "password": "string",
        "content": "string",
        "id": "int",
        "domain": "string",
        "token": "string",
        "refreshKey": "string",
    }

    @param: CreateUserDto
    @return: UserDto
    """
    def __init__(self):
        pass

    @staticmethod
    async def createUser(self, user: CreateUserDto):
        """
        Create a user.
        
        Args:
            user (CreateUserDto): The user to create.
            
        Returns:
            str: The response from the server.
        """
        conn = http.HTTPSConnection("api.scarletai.xyz", 443)
        conn.request("POST", "/v3/user/", user.toJson())
        res = conn.getresponse()
        data = res.read()
        conn.close()
        return data

    @staticmethod
    async def getUser(self, user: UserDto):
        """
        Get your user account.
        
        Args:
            user (CreateUserDto): Your account DTO.
            
        Returns:
            str: The response from the server.
        """
        conn = http.HTTPSConnection("api.scarletai.xyz", 443)
        conn.request(
            "GET", "/v3/user/" + user.id, user.toJson(),
            {"Authorization": "Bearer " + user.token}
        )
        res = conn.getresponse()
        data = res.read()
        conn.close()
        return data

    @staticmethod
    async def deleteUser(self, user: UserDto):
        """
        Delete a user.
        
        Args:
            user (CreateUserDto): The user to delete.
            
        Returns:
            str: The response from the server.
        """
        conn = http.HTTPSConnection("api.scarletai.xyz", 443)
        conn.request(
            "DELETE", "/v3/user/" + user.id, user.toJson(),
            {"Authorization": "Bearer " + user.token}
        )
        res = conn.getresponse()
        data = res.read()
        conn.close()
        return data

    @staticmethod
    async def updateUser(self, user:CreateUserDto):
        """
        Update a user.
        
        Args:
            user (CreateUserDto): The user to update.
            
        Returns:
            str: The response from the server.
        """
        conn = http.HTTPSConnection("api.scarletai.xyz", 443)
        conn.request(
            "PUT", "/v3/user/" + user.id, user.toJson(),
            {"Authorization": "Bearer " + user.token}
        )
        res = conn.getresponse()
        data = res.read()
        conn.close()
        return data

    @staticmethod
    async def refreshToken(self, user:UserDto):
        """
        Refresh the token of the user.
        
        Args:
            user (UserDto): The user to refresh the token.

        Returns:
            str: The response from the server.
        """
        conn = http.HTTPSConnection("api.scarletai.xyz", 443)
        conn.request(
            "POST", "/v3/auth/refresh-token", user.toJson(),
            {"Authorization": "Bearer " + user.token}
        )
        res = conn.getresponse()
        data = res.read()
        conn.close()
        return data

    @staticmethod
    async def authorizeUser(self, user:UserDto):
        """
        Send an Authorization request.
        
        Args:
            user (UserDto): The user to refresh the token.

        Returns:
            str: The response from the server.
        """
        conn = http.HTTPSConnection("api.scarletai.xyz", 443)
        conn.request(
            "POST", "/v3/auth/token", user.toJson()
        )
        res = conn.getresponse()
        data = res.read()
        conn.close()
        return data

    @staticmethod
    async def analyzeContent(self, content:str):
        """
        Analyze content and return the result

        Args:
            content (str): The content to analyze.

        Returns:
            str: The response from the server.
        """
        conn = http.HTTPSConnection("api.scarletai.xyz", 443)
        # check if the content has a url
        if "http" in content:
            conn.request(
                "POST", "/v3/analyze/link", {"domain": content}
            )
            res = conn.getresponse()
            data = res.read()
            conn.close()
            return data
        else:
            conn.request(
                "POST", "/v3/analyze/msg", {"text": content}
            )
            res = conn.getresponse()
            data = res.read()
            conn.close()
            return data

if __name__ == "__main__":
    scarlet = Scarlet()
