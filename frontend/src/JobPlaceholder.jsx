
function JobPlaceholder() {
  return (
    <ul className="flex flex-col gap-6 mt-6">
        <li className="animate-pulse min-w-[600px] h-32 bg-slate-900 flex flex-col gap-2 py-4 px-6">
          <div className="h-4 w-32 bg-slate-800 animate-pulse"></div>
          <div className="h-4 w-36 bg-slate-800 animate-pulse"></div>
          <div className="h-4 w-16 bg-slate-800 animate-pulse"></div>
          <div className="h-8 w-20 rounded bg-slate-800 animate-pulse self-end"></div>
        </li>
      </ul>
  );
}

export default JobPlaceholder;