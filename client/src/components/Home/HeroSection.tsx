import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { Button } from "../../components/ui/button";
import pizzaImg from "@/assets/pizza.jpg";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    if (!search) return;
    e.preventDefault();
    navigate(`/search/${search}`);
  };
  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto  md:p-10 rounded-lg items-center justify-center m-4 gap-20">
      <div className="flex flex-col gap-10 md:w-[40%]">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold md:font-extrabold md:text-5xl text-3xl">
            Order food anytime & anywhere
          </h1>
          <p className="text-gray-500">
            Hey! Our delicious food is waiting for you, we are always near to
            you .
          </p>
        </div>
        <form
          onSubmit={handleSearchSubmit}
          className="relative flex items-center gap-2"
        >
          <Input
            type="text"
            value={search}
            placeholder="Search restaurant by name, city & country"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            className="pl-10 h-12 border-2 shadow-md"
          />
          <Search className="text-gray-500 absolute left-2 inset-y-3" />
          <Button type="submit" className="h-12">
            Search
          </Button>
        </form>
      </div>

      <div className="w-full">
        <img
          src={pizzaImg}
          alt="hero-section-image"
          className="object-cover w-full max-h-125 rounded-lg"
        />
      </div>
    </div>
  );
}

export default HeroSection;
