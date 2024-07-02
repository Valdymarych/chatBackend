const config = {
    serverPort : 3001,
    mongoURI : "mongodb+srv://admin:admin@cluster0.wp1yspi.mongodb.net/data?retryWrites=true&w=majority&appName=Cluster0",
    httpStatuses : {
        OK_200 : 200,
        CREATED_201 : 201,
        DELETED_200: 200,
        SERVER_ERROR_500: 500,
        BAD_REQUEST_400: 400,
        UNAUTHORIZED_401: 401,
        NOT_FOUND_404: 404,
        ALREADY_EXIST_409: 409
    },
    corsOptions : {
        "origin":'*', 
        "credentials":true,
        "optionSuccessStatus":200
    },
    userPasswordSaltLength: 5,
    secretKey_JWT: "bibaeatpotato",
    uploadsPath: "C:\\Users\\vovao\\OneDrive\\Documents\\Lyceum\\SBS_2\\projects\\volodya\\admin_panel_backend\\src\\uploads",
    API_url: "http://localhost:3001"
}
export default config