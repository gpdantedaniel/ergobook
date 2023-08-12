import { Oval } from "react-loader-spinner"

const NotebookCardLoading = () => {
  return (
    <li
      className='
        w-full md:w-48 md:h-64
        bg-slate-100 
        border-2 border-slate-200 
        p-4 gap-3
        rounded-lg
        transition
        flex flex-col md:flex-col items-center justify-center
        animate-pulse
        text-slate-400
        text-base
      '
    >
      <Oval
        height={40}
        width={40}
        color="rgb(203 213 225)"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="rgb(241 245 249)"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </li>
  )
}

export default NotebookCardLoading


/*
<div
  className='
    h-[50vh] md:w-48 md:h-64
    bg-slate-100
    p-4
    rounded-lg
    animate-pulse
    col-span-full
    row-span-2
    flex flex-col md:flex-col items-center justify-center
    text-slate-400
    text-base
    gap-3
  '
>
  <Oval
    height={80}
    width={80}
    color="rgb(203 213 225)"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
    ariaLabel='oval-loading'
    secondaryColor="rgb(226 232 240)"
    strokeWidth={2}
    strokeWidthSecondary={2}
  />
  Loading...
</div>
*/