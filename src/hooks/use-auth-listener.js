import {useState, useEffect, useContext} from 'react'
import FirebaseContext from '../context/firebase'
import 'firebase/compat/auth'

const useAuthListener = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')))
    const {firebase} = useContext(FirebaseContext)

    useEffect(()=>{
        return firebase.auth().onAuthStateChanged((authUser)=>{
            if ( authUser ){
                localStorage.setItem('authUser', JSON.stringify(authUser))
                setUser(authUser)
            }else{
                localStorage.removeItem('authUser')
                setUser(null)
            }
        })

    }, [firebase])

    return ( {user} )
}

export default useAuthListener