import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import pizzaImg from "@/assets/pizza.jpg";

function MenuList() {
  return (
    <div className="md:p-4">
      <h1 className="text-xl md:text-2xl font-bold mb-6">Available Menus</h1>
      <div className="grid md:grid-cols-3 space-y-4 md:space-y-0">
        <Card className="md:max-w-md w-full mx-auto shadow-lg rounded-lg overflow-hidden">
          <img
            src={pizzaImg}
            alt="menu-image"
            className="w-full h-40 object-cover "
          />
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Menu Name
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <h3 className="text-lg font-semibold mt-4">
              Price: <span className="text-primary">₹200</span>
            </h3>
          </CardContent>
          <CardFooter className="p-4">
            <Button className="w-full">Add to Cart</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default MenuList;
