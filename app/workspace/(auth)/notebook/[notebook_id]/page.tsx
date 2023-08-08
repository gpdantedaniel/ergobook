import Header from "@/components/Header"

interface NotebookProps {
  params: {
    notebook_id: string
  }
}

const SectionCard = () => {
  return (
    <div className='p-3 text-sm'>
      Non-descript Section
    </div>
  )
}

const Notebook: React.FC<NotebookProps> = ({ params }) => {
  // Notebook {params.notebook_id}
  return (
    
    <div className="h-full flex flex-col">
      <div className='bg-[#FFEFBF]'>
        <Header/>
      </div>
      
      {/* Main Content */}
      <main className='flex-1 flex w-full overflow-hidden overflow-y-auto'>
        <div className='h-full border border-r-black overflow-hidden w-1/6'>
          <div className='w-full text-lg p-3'>
            Sections
          </div>
          <div>
            <SectionCard/>
            <SectionCard/>
            <SectionCard/>
            <SectionCard/>
            <SectionCard/>
            <SectionCard/>
            <SectionCard/>
            <SectionCard/>
            <SectionCard/>
            <SectionCard/>
          </div>
        </div>       
      </main>
    </div>
  )
}

export default Notebook