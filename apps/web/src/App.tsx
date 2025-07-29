import { client } from "@/apis/hono.ts";
import { Button } from "@workspace/ui/components/button";

function App() {
  const honoTest = () => {
    client.index
      .$get()
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Data received:", data.message);
      })
      .catch((error) => {
        console.error("Error calling Hono server:", error);
      });
  };

  return (
    <div>
      <div className="text-2xl font-bold">asdf</div>
      <Button size="sm" onClick={honoTest}>
        Click me
      </Button>
    </div>
  );
}

export default App;
