import {
  MessageSquare,
  User,
  LogOut,
  Settings,
  ShoppingBag,
  List,
  Package,
} from "lucide-react";
import { SearchBar } from "./Searchbar";
import { CartButton } from "./CartButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useAuth from "@/contexts/AuthContext";
import fatimaLogo from "@/assets/FatimaLogo.png";
import { useNavigate } from "react-router-dom";

interface TopbarProps {
  cartItemCount: number;
  onCartClick: () => void;
  onSearch: (query: string) => void;
}

export const Topbar = ({
  cartItemCount,
  onCartClick,
  onSearch,
}: TopbarProps) => {
  const { authResponse } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 py-2">
      <div className="container mx-auto flex h-16 items-center justify-between gap-2 px-3 sm:px-4 md:px-8">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer h-10 shrink-0"
          onClick={() => navigate("/dashboard")}
        >
          <img src={fatimaLogo} alt="Fatima Logo" className="h-full" />
          <span className="text-lg sm:text-xl font-bold tracking-tight hidden xs:inline-block">
            Iskommerce
          </span>
        </div>

        {/* Search (flexible width) */}
        <div className="hidden sm:flex flex-1 lg:max-w-lg">
          <SearchBar onSearch={onSearch} />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-4 shrink-0">
          {/* Hide on small screens */}
          <Button
            variant="ghost"
            size="icon"
            className="[&_svg:not([class*='size-'])]:size-5"
          >
            <MessageSquare className="h-5 w-5 md:h-6 md:w-6" />
          </Button>

          <CartButton itemCount={cartItemCount} onClick={onCartClick} />

          {/* Avatar Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-full p-0"
              >
                <Avatar className="h-9 w-9 sm:h-10 sm:w-10">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-56"
              align="end"
              sideOffset={8}
              forceMount
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1 wrap-break-words">
                  <p className="text-sm font-medium leading-none truncate">
                    {authResponse?.userData.fullName}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground truncate">
                    {authResponse?.userData.email}
                  </p>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem className="gap-2">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="gap-2"
                onClick={() => navigate("/my-orders")}
              >
                <Package className="h-4 w-4" />
                <span>My Orders</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="gap-2"
                onClick={() => navigate("/my-listings")}
              >
                <List className="h-4 w-4" />
                <span>My Listings</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="gap-2">
                <ShoppingBag className="h-4 w-4" />
                <span>Post Item</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem className="gap-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="container">
        <div className="flex sm:hidden flex-1 lg:max-w-lg">
          <SearchBar onSearch={onSearch} />
        </div>
      </div>
    </header>
  );
};
