import { cn } from "@/lib/utils";
import { SettingsIcon, UserIcon } from "lucide-react"
import Link from "next/link";
import { GoCheckCircle, GoHome, GoHomeFill} from "react-icons/go"


const routes = [
    {
        label: "Home",
        href: "/",
        icon: GoHome,
        activeIcon: GoHomeFill,
    },
    {
        label: "My Tasks",
        href: "/tasks",
        icon: GoCheckCircle,
        activeIcon: GoHomeFill,
    },
    {
        label: "Settings",
        href: "/settings",
        icon: SettingsIcon,
        activeIcon: GoHomeFill,
    },
    {
        label: "Members",
        href: "/members",
        icon: UserIcon,
        activeIcon: GoHomeFill,
    },
];


export const Navigation = () => {


    return (
        <ul>
            {routes.map((items) => {
                const isActive = false;
                const Icon = isActive ? items.activeIcon : items.icon;

                return (
                    <Link key={items.href} href={items.href}>
                        <div className={cn(
                            "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500",
                            isActive && "bg-white shadow-sm hover:opacity-100 text-primary "
                        )}>   
                            <Icon className="size-5 text-neutral-500 " />
                            {items.label}
                        </div>
                    </Link>
                )
            })}
        </ul>
    )
}
