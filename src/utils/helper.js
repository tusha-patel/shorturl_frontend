import { getCurrentUser } from "../api/user.api";
import { login } from "../store/slice/authSlice";
import { redirect } from "@tanstack/react-router";

// check auth and redirect to login page
export const checkAuth = async ({ context }) => {
    try {
        const { queryClient, store } = context;
        const user = await queryClient.ensureQueryData({
            queryKey: ["currentUser"],
            queryFn: getCurrentUser,
        });
        console.log(user);

        if (!user) return false
        store.dispatch(login(user));
        const { isAuthenticated } = store.getState().auth;
        if (!isAuthenticated) return false;
        return true;
    } catch (error) {
        console.log(error, "error from check auth");
        return redirect({ to: "/auth" });

    }
}