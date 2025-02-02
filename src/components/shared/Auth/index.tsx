import { useEffect } from "react";
import { Cookies } from "react-cookie";
import { useAuthData } from "@/store/auth/AuthData";
import { usePathname, useRouter } from "next/navigation";
import { fnDecodeToken } from "@/utils/functions/fnDecodeToken";

export default function Auth({
    children,
    setLoading,
}: {
    children: React.ReactElement;
    setLoading: (value: boolean) => void;
}) {
    const cookies = new Cookies();
    const authHook = useAuthData();

    const pathname = usePathname();
    const router = useRouter();

    const publicRoutes = [
        "/",
        "/auth/esqueci",
        "/auth/cadastrar",
        "/recuperar-senha/[token]",
        "/termos",
    ];

    const authRoutes = ["/", "/auth/login", "/auth/cadastrar", "/auth/esqueci"];

    useEffect(() => {
        const handleAuth = async () => {
            const isPublic = publicRoutes.includes(pathname);
            const isAuth = authRoutes.includes(pathname);

            const paths = pathname.split("/");
            const token = cookies.get("userid");
            const hash = token ? fnDecodeToken(token) : null;

            if (hash?.id && pathname === "/auth/login") {
                router.push("/dashboard");
                setLoading(false);
                return;
            }

            if (!paths.includes("dashboard") && !paths.includes("auth")) {
                setLoading(false);
                return;
            }

            if (isAuth) {
                if (hash?.id) {
                    try {
                        await authHook.fnFetchValidator();
                        router.push("/dashboard");
                    } catch {
                        cookies.remove("userid", { path: "/" });
                        router.push("/auth/login");
                    } finally {
                        setLoading(false);
                    }
                } else {
                    cookies.remove("userid", { path: "/" });
                    setLoading(false);
                }
            } else if (!isPublic) {
                if (!hash?.id) {
                    cookies.remove("userid", { path: "/" });
                    router.push("/auth/login");
                }
            } else {
                cookies.remove("userid", { path: "/" });
                setLoading(false);
            }
        };

        handleAuth();
    }, [pathname, authHook, router, setLoading]);

    return <>{children}</>;
}
