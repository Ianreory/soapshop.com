import { Menu, Package2, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Cookies from "js-cookie";

const Navbar = () => {
  const handleLogout = () => {
    Cookies.remove("token");
    window.location.href = "/login";
    alert("Logout Success");
  };
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b  px-4 md:px-6 z-50 bg-[#1E293B]">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 py-12">
        <Link to="/" className="flex items-center ">
          <h1 className="sr-only gap-2 font-bold font-Poppins text-4xl ">Soap Shop</h1>
        </Link>
        <Link to="/" className="text-muted-foreground transition-colors hover:text-foreground">
          <h1 className="font-bold font-Poppins text-3xl "> Soap</h1>
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Shop</span>
            </Link>
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              Shop
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search products..." className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]" />
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to="/profile">My Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/carts">Shooping Cart</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/users/products">My Product</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/order/list">Order</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/login">Login</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Navbar;
