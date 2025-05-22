import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/uri";
import { JobContext } from "../context/jobContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { setSearchQuery } = useContext(JobContext); 

  const handleLogOut = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.status === 200 && res.data.success) {
        setUser(null);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link to={"/"}>
      <div className="text-2xl font-bold text-gray-800">
        Hire<span className="text-blue-600">Wave</span>
      </div>
      </Link>

      {user && user.role === "recruiter" ? (
        <>
          <div className="space-x-6 text-gray-600 font-medium">
            <Link
              to={"/admin/companies"}
              className="hover:text-blue-600 transition">
              Companies
            </Link>
            <Link to={"/admin/jobs"} className="hover:text-blue-600 transition">
              Jobs
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="space-x-6 text-gray-600 font-medium">
            <Link to={"/"} className="hover:text-blue-600 transition">
              Home
            </Link>
            <Link to={"/jobs"} onClick={() =>  setSearchQuery("")} className="hover:text-blue-600 transition">
              Jobs
            </Link>
            <Link to={"/browse"} className="hover:text-blue-600 transition">
              Browse
            </Link>
          </div>
        </>
      )}

      {!user ? (
        <div className="flex space-x-4">
          <Link to={"/signin"}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow transition duration-300 cursor-pointer">
              Sign In
            </button>
          </Link>
          <Link to={"/signup"}>
            <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded-lg transition duration-300 cursor-pointer">
              Sign Up
            </button>
          </Link>
        </div>
      ) : (
        <Popover>

            <PopoverTrigger>
              <Avatar>
                <AvatarImage src={user.profile.profilePhoto || "https://github.com/shadcn.png" } alt="@shadcn" />
                <AvatarFallback>Profile</AvatarFallback>
              </Avatar>
            </PopoverTrigger>

          <PopoverContent className="w-80 p-4 space-y-4">
            {/* Profile Header */}
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={user.profile.profilePhoto || "https://github.com/shadcn.png" } alt="@shadcn" />
                <AvatarFallback>Profile</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-semibold text-lg">{user.fullname}</h1>
                <p className="text-sm text-gray-500">{user.profile.bio}</p>
              </div>
            </div>

         
            <div className="space-y-2">
              {
                user && user.role === "student"? (
                  <>
                  <Link to={"/profile/update"}>
                <button className="flex items-center space-x-2 text-white bg-blue-600 cursor-pointer hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md transition duration-300 ease-in-out w-full">
                  <FaUserCircle size={20} className="text-white" />
                  <span className="font-semibold">View Profile</span>
                </button>
              </Link>
                  </>
                ): <></>
              }
              
              <Button
                variant="link"
                className="text-red-600 hover:underline cursor-pointer w-full text-left"
                onClick={handleLogOut}
              >
                Logout
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </nav>
  );
};

export default Navbar;
