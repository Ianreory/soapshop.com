import { Button } from "@/components/ui/button";
import { deleteProfile, getProfile, updateProfile } from "@/utils/apis/users";
import { IUser, ProfileSchema } from "@/utils/types/users";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function EditProfile() {
  const [data, setData] = useState<ProfileSchema>({
    address: "",
    email: "",
    username: "",
    password: "",
    phone_number: "",
  });
  const [image, setImage] = useState<IUser | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await getProfile();
      const profile = response.data;

      setData({
        address: profile.address,
        email: profile.email,
        username: profile.username,
        password: profile.password,
        phone_number: profile.phone_number,
      });
      setImage(profile);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch data");
    }
  }

  const navigate = useNavigate();

  async function handleUpdate() {
    try {
      const response = await updateProfile(data);
      console.log(response);
      navigate("/profile");
    } catch (error) {
      alert("Failed to update profile");
    }
  }

  async function handleDelete() {
    try {
      const response = await deleteProfile();
      alert(response.message);
      navigate("/profile");
    } catch (error) {
      alert("Failed to delete profile");
    }
  }

  return (
    <div className="min-h-screen p-6 bg-[#0F172A] flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <div className="bg-[#1e293b] rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Personal Details</p>
                <p>Please fill out all the fields.</p>
                <div className="flex items-center justify-center">
                  <img src={image?.images.length !== 0 ? image?.images : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} className="w-full pt-5 md:w-60" alt="Profile" />
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-3">
                  <div className="md:col-span-5">
                    <label htmlFor="username">User name</label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder="Full Name"
                      value={data.username}
                      onChange={(e) => setData({ ...data, username: e.target.value })}
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="email@domain.com" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="address">Address</label>
                    <input type="text" name="address" id="address" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="address" value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} />
                  </div>
                  <div className="md:col-span-5">
                    <label htmlFor="phone_number">Phone number</label>
                    <input
                      type="text"
                      name="phone_number"
                      id="phone_number"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder="phone number"
                      value={data.phone_number}
                      onChange={(e) => setData({ ...data, phone_number: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-5">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="password" onChange={(e) => setData({ ...data, password: e.target.value })} />
                  </div>
                  <div className="md:col-span-5 text-right">
                    <div className="inline-flex items-end gap-2">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[10px] px-4 rounded" onClick={() => handleUpdate()}>
                        Submit
                      </button>
                      <Button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete()}>
                        Delete Account
                      </Button>
                      <Button className=" font-bold py-[10px] px-10 rounded">
                        <Link to="/profile">Back</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
