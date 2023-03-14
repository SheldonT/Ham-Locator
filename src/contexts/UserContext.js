import { createContext, useState } from "react";

export const UserContext = createContext({});

const UserProvider = ({ children }) => {
    /* 
        States (and their setters) can be passed into the provider via the value prop in the return
    */
	const [isAuthenticated, setIsAuthenticated] = useState(false);

    // other states as needed...


    /* 
        Functions that are created in the provider can either be private to the Provider
        OR
        Functions can be passed into the provider via the value prop in the return
    */
    const login = async () => {
        // make call to API here
        setIsAuthenticated(true);
    }

    // other functions as needed...

	return (
        /* 
            The provider is what is "serving" the context to your application. You can find this wrapped in the 
            index.js file in src

            The [value] prop of the Provider is what can be referenced throughout the applciation

            [children] represents all of the components that can access this (we wrap around the entire app usually)
        */
		<UserContext.Provider
			value={{
				isAuthenticated,
                login
			}}
		>
			{children}
		</UserContext.Provider>
	);
}

export default UserProvider;