
import Header from '../../../components/Header'
import NotebookBrowser from '@/components/NotebookBrowser';

const Workspace = () => {
  return (
    <div className="h-full flex flex-col">
      <Header/>
      <main className='
          w-full pt-24 md:pt-40
          flex-1 flex justify-center
          overflow-hidden overflow-y-auto 
        bg-white
        '
      >
        <div className='
          px-4 md:px-0
          w-full md:w-10/12'
        >
          <div className='pb-6'>
            <h1 className='text-2xl'>
              My Notebooks
            </h1>
          </div>
          <div className='flex gap-6 pb-20 justify-between flex-wrap'>
            <NotebookBrowser/>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Workspace
/*
<div className='flex-1 h-full bg-[#F8CF50]/70 min-h-[536px] min-w-[192px] max-w-[408px] rounded-md p-4'>
  My Tasks
</div>
*/