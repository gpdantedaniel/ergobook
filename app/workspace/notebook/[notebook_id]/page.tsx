import SectionsBrowser from "@/components/SectionsBrowser"

interface NotebookViewProps {
  params: {
    notebook_id: string
  }
}

const NotebookView: React.FC<NotebookViewProps> = ({ params }) => {
  const notebook_id: number = Number(params.notebook_id)
  return (
    <>
      <SectionsBrowser notebook_id={notebook_id}/>
      <div className='flex-1 flex justify-center w-full ml-auto pt-16 pb-16'>
        <div className='w-1/4 theme-text-colors'>
          Notebook Section Content
        </div>
      </div>
    </> 
  )
}

export default NotebookView