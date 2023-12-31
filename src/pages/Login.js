import { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import FirebaseContext from '../context/firebase'
import * as ROUTES from '../constants/Routes'

require('firebase/auth')

function Login() {

    const history = useHistory()
    const { firebase } = useContext(FirebaseContext)

    const [emailAddress, setEmailAddress] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const isInvalid = password === '' || emailAddress === ''

    const handleLogin = async (event)=>{
        event.preventDefault()
        

        try {
            await firebase.auth().signInWithEmailAndPassword(emailAddress, password)
            history.push(ROUTES.DASHBOARD)
        } catch (error) {
            setEmailAddress('')
            setPassword('')
            if( error.message === `Firebase: A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred. (auth/network-request-failed).` ){
                setError("Network error. Check your connected to a stable network")
            }else if(error.message === "Firebase: The password is invalid or the user does not have a password. (auth/wrong-password)."){
                setError("Email Address and Password do not match any record")
            }
            else{
                setError(error.message)
            }
        }
    }

    useEffect(()=>{
        document.title = "Login - Instagram"
    }, [])

    return (
        <>
            <div className="container flex mx-auto md:w-9/12 lg:w-7/12 items-center h-screen">
                <div className="flex w-3/5">
                    <img src={'/images/iphone-with-profile.jpg'} alt='iPhone with instagram'/>
                </div>
                <div className="flex flex-col w-2/5 items-center rounded bg-white p-4 border border-gray-primary">
                    <h1 className="flex justify-center w-full">
                        <img src={'/images/logo.png'} alt="Instagram" className="mt-2 w-6/12"/>
                    </h1>
                    {error && <p className="mb-4 text-xs text-red-primary cursor-default">{error}</p>}

                    <form onSubmit={handleLogin} method="POST">
                        <input 
                            aria-label="Enter your email address"
                            type="text" 
                            placeholder="Email address" 
                            className="text-small text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({target}) => setEmailAddress(target.value)}
                            value={emailAddress}
                        />
                        <input 
                            aria-label="Enter your password"
                            type="password" 
                            placeholder="Password" 
                            className="text-small border border-gray-primary rounded text-gray-base w-full mr-3 py-5 px-4 h-2"
                            onChange={({target}) => setPassword(target.value)}
                            value={password}
                        />
                        <button 
                            disabled={isInvalid} 
                            type="submit" 
                            className={`bg-blue-medium text-white w-full rounded h-8 font-bold mt-2 ${isInvalid && 'opacity-50'} `}>
                                Log In
                        </button>
                    </form>
                    <div className="flex jsutify-center items-center flex-col w-full bg-white p-4 border rounded border-gray-primary mt-2">
                        <p className="text-sm cursor-default">
                            Don't have an account?{ ' ' }
                            <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium cursor-pointer">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
                
            </div>        
        </>
    )
}

export default Login
