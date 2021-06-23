function styleLoginCreate()
{
    var s =
    `
        <style>
.form-control {
    min-height: 41px;
    background: #f2f2f2;
    box-shadow: none !important;
    border: transparent;
}
.form-control:focus {
    background: #e2e2e2;
}
.form-control, .btn {        
    border-radius: 2px;
}
.login-form {
    width: 350px;
    margin: 100px auto 30px auto;
    text-align: center;
}
.login-form h2 {
    margin: 10px 0 25px;
}
.login-form form {
    color: #7a7a7a;
    border-radius: 3px;
    margin-bottom: 15px;

    padding: 30px;
}
.login-form .btn {        
    font-size: 16px;
    font-weight: bold;
    background: #3598dc;
    border: none;
    outline: none !important;
}
.login-form .btn:hover, .login-form .btn:focus {
    background: #2389cd;
}
.login-form a {
    color: #fff;
    text-decoration: underline;
}
.login-form a:hover {
    text-decoration: none;
}
.login-form form a {
    color: #7a7a7a;
    text-decoration: none;
}
.login-form form a:hover {
    text-decoration: underline;
}
.full-height{
    min-height:100vh;
}
.width-50{
  width:50%  
}

        </style>
`;
return s;
} 