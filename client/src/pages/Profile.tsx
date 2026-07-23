import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Mail, Plus, MapPin, Building, Globe } from "lucide-react";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import type { ProfileInputState } from "@/types/auth";
import { useProfile } from "@/hooks/auth/useProfile";
import { useProfileUpdate } from "@/hooks/auth/useProfileUpdate";
import { useQueryClient } from "@tanstack/react-query";
import Loader from "@/components/ui/Loader";
import { toast } from "sonner";

function Profile() {
  const { data, isLoading } = useProfile();
  const { mutate, isPending } = useProfileUpdate();
  const queryClient = useQueryClient();

  const [profileData, setProfileData] = useState<ProfileInputState>({
    fullname: "",
    email: "",
    address: "",
    city: "",
    country: "",
    profilePicture: "",
  });

  // snapshot of last-saved values, used to detect real changes
  const [originalData, setOriginalData] = useState<ProfileInputState>({
    fullname: "",
    email: "",
    address: "",
    city: "",
    country: "",
    profilePicture: "",
  });

  const imageRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    if (data) {
      const fetched: ProfileInputState = {
        fullname: data?.user?.fullname || "",
        email: data?.user?.email || "",
        city: data?.user?.city || "",
        country: data?.user?.country || "",
        address: data?.user?.address || "",
        profilePicture: data?.user?.profilePicture || "",
      };
      setProfileData(fetched);
      setOriginalData(fetched); // baseline to compare against
    }
  }, [data]);

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const hasChanges =
    profileData.fullname !== originalData.fullname ||
    profileData.address !== originalData.address ||
    profileData.city !== originalData.city ||
    profileData.country !== originalData.country ||
    imageFile !== null;

  const handleSubmit = () => {
    setApiError("");
    const formData = new FormData();
    formData.append("fullname", profileData.fullname);
    formData.append("address", profileData.address);
    formData.append("city", profileData.city);
    formData.append("country", profileData.country);
    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    mutate(formData, {
      onSuccess: async (res) => {
        toast.success(res.message);
        await queryClient.invalidateQueries({ queryKey: ["profile"] });
        setImageFile(null);
        setSelectedImage("");
        setOriginalData(profileData);
      },
      onError: (error) => {
        setApiError(error?.response?.data?.message || "Profile update failed");
      },
    });
  };

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      {apiError && (
        <div className="p-3 mb-4 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
          {apiError}
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-6">
          <div
            className="relative group cursor-pointer"
            onClick={() => imageRef.current?.click()}
          >
            <Avatar className="md:w-32 md:h-32 w-24 h-24 border-2 border-gray-200">
              <AvatarImage
                src={selectedImage || profileData.profilePicture}
                alt="Profile"
                className="object-cover"
              />
              <AvatarFallback className="text-2xl font-bold bg-gray-100 text-gray-600">
                {profileData.fullname?.charAt(0) || "CN"}
              </AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 rounded-full">
              <Plus className="text-white w-8 h-8" />
            </div>
          </div>

          <input
            className="hidden"
            type="file"
            ref={imageRef}
            onChange={fileChangeHandler}
            accept="image/*"
          />

          <div className="flex flex-col">
            <input
              type="text"
              name="fullname"
              onChange={handleChange}
              value={profileData.fullname}
              className="font-bold text-3xl outline-none border-b-2 border-transparent focus:border-gray-300 bg-transparent py-1 w-full text-gray-800"
            />
            <span className="text-sm text-gray-400 mt-1">
              Click name to edit
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <Card className="shadow-sm border-gray-200">
          <CardContent className="flex items-center gap-4 p-4">
            <Mail className="text-gray-400 w-6 h-6 shrink-0" />
            <div className="w-full">
              <Label className="text-xs text-gray-400 font-semibold uppercase">
                Email Address
              </Label>
              <Input
                type="email"
                name="email"
                value={profileData.email}
                readOnly
                className="w-full text-gray-700 bg-transparent focus-visible:ring-0 p-0 h-6 border-none shadow-none"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-gray-200">
          <CardContent className="flex items-center gap-4 p-4">
            <MapPin className="text-gray-400 w-6 h-6 shrink-0" />
            <div className="w-full">
              <Label className="text-xs text-gray-400 font-semibold uppercase">
                Address
              </Label>
              <Input
                type="text"
                name="address"
                value={profileData.address}
                onChange={handleChange}
                className="w-full text-gray-700 bg-transparent focus-visible:ring-0 p-0 h-6 border-none shadow-none"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-gray-200">
          <CardContent className="flex items-center gap-4 p-4">
            <Building className="text-gray-400 w-6 h-6 shrink-0" />
            <div className="w-full">
              <Label className="text-xs text-gray-400 font-semibold uppercase">
                City
              </Label>
              <Input
                type="text"
                name="city"
                value={profileData.city}
                onChange={handleChange}
                className="w-full text-gray-700 bg-transparent focus-visible:ring-0 p-0 h-6 border-none shadow-none"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-gray-200 md:col-span-2">
          <CardContent className="flex items-center gap-4 p-4">
            <Globe className="text-gray-400 w-6 h-6 shrink-0" />
            <div className="w-full">
              <Label className="text-xs text-gray-400 font-semibold uppercase">
                Country
              </Label>
              <Input
                type="text"
                name="country"
                value={profileData.country}
                onChange={handleChange}
                className="w-full text-gray-700 bg-transparent focus-visible:ring-0 p-0 h-6 border-none shadow-none"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mt-8">
        <Button
          onClick={handleSubmit}
          disabled={isPending || !hasChanges}
          className="w-full md:w-1/3 py-6 text-md font-semibold"
        >
          {isPending ? (
            <Loader2 className="animate-spin mr-2" />
          ) : (
            "Update Profile"
          )}
        </Button>
      </div>
    </div>
  );
}

export default Profile;
