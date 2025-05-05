export default function Input({label, invalid, ...props}){
    let labelClasses = "block mb-2 text-base font-bold tracking-widest uppercase";
    let inputClasses = "w-full px-3 py-2 leading-tight border rounded shadow";
    if (invalid){
      labelClasses += " text-red-400";
      inputClasses += " test-red-500 bg-red-100 border-red-300"
    } else {
      labelClasses += " text-stone-700";
      inputClasses += " text-stone-700 bg-stone-50";
    }
    return (
      <p>
        <label className={labelClasses}>{label}</label>
        <input className={inputClasses} {...props}/>
      </p>
    )
  }