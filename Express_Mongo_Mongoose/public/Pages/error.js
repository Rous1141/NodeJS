 function ErrorPage(errorCode, errorMessage) {
    return (
        <body>
            <h1 style="color: red;">Error! I don't think you should be here yet...</h1>
            <h3>Error code:{errorCode} - {errorMessage}</h3>
            <p>Missing files, unsupported action, fraud login? Get out of here</p>
        </body>
    )
}

export default ErrorPage