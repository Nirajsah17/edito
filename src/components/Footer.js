function Footer({ }) {
  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <div>left</div>
        <div>Middle</div>
        <div className="pr-8">
        <button class="w-20 rounded-md bg-purple-500 text-white border border-purple-500 p-1 hover:bg-purple-700 hover:text-white">save</button>
        </div>
      </div>
    </>
  )
}
export default Footer;
export {Footer}