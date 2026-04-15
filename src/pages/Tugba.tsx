import { useTodo } from "../context/TodoContext";


const Tugba = () => {
   const { todos, loading } = useTodo();

   if (loading) {
      return <div>Loading...</div>
   }
   return (
      <>
         <div>Tugba Kolcuoglu</div>
         {JSON.stringify(todos)}
      </>

   )
}

export default Tugba