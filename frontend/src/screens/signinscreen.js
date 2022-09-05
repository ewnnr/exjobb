const signInScreen = {
    after_render: () => {},
    render: () => {
        return `
        <div class="form-container">
            <form id="signin">
                <ul class= "form-items">
                    <li>
                        <h1> LOGGA IN</h1>
                    </li>
                    <li>
                        <label for ="email"> E-post: </label>
                        <input type="email" class="email" id="email"/>
                    </li>
                    <li>
                    <label for ="password"> Lösenord: </label>
                        <input type="password" class="password" id="password"/>
                    </li>
                    <li>
                        <button type= "submit" class "submitbutton"> LOGGA IN </button>
                    </li>
                    <li>
                        <div>                        
                            Ny användare? <a href="/#/register"> Skapa inloggning här</a>
                        </div>   
                    </li>    
                </ul>
            </form>
        </div>
        
        `
    }
};

export default signInScreen;