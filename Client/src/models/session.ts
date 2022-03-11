import router from "../router";
import * as users from "../models/user"
import { reactive } from "vue";


const session = reactive({
    user: null as users.User | null,
})

export async function Login(handle: string, password: string) {
    const user = users.list.find(u => u.handle === handle);
    if (!user) {
        throw { message: "User not found" };
    }
    if(user.password !== password) {
        throw { message: "Password Incorrect" };
    }
    session.user = user;
    router.push('/');
}
export function Logout() {
    session.user = null;
    router.push('/login');
}
    
export default session;