import { Quotes } from "../components/Quotes"
import { Auth } from "../components/Auth"

export const Signup = () => {
    return <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">

            <div>
            <div className="flex items-center p-1 mt-2 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300" role="alert">
                    
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">Note : </span> For signup, please use a dummy email with a valid format, 
                        such as thor@gmail.com, and ensure it follows the proper email structure. Additionally, the password must be at least 
                        6 characters long; for example,  '123456'.
                    </div>
                </div>
                <Auth type="signup" />
            </div>
            <div className="hidden lg:block">
                <Quotes />
            </div>
            </div>
        
    </div>

}