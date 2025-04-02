"use client";
import { useEffect } from "react";
import useAuthStore from "@/AuthStore/userStore.js";
import axios from "axios";

export default function AuthProvider({ children }) {
    const { setUser, setLoading } = useAuthStore();

    useEffect(() => {
        if (!localStorage.getItem("XMXYV2")) {
          setLoading(false)
            return;
        }

        const fetchUser = async () => {
            setLoading(true); // Start loading

            try {
                const response = await axios.get("/api/mantox/auth/get/user", {
                    withCredentials: true
                });

                if (response.data.success) {
                    setUser(response.data.user);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return children;
}
