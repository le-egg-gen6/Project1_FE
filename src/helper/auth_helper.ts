import { UserData } from "@/store/authStore";

export function getFullName(user: UserData | null) {
    if (user == null) {
        return "ledeptrai";
    }
    return user.firstName + " " + user.lastName;
}