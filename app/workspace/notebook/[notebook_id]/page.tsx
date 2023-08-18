import SectionsBrowser from "@/components/Section/SectionsBrowser";

interface NotebookViewProps {
  params: {
    notebook_id: string;
  };
}

const NotebookView: React.FC<NotebookViewProps> = ({ params }) => {
  const notebook_id: number = Number(params.notebook_id);
  return (
    <>
      <SectionsBrowser notebook_id={notebook_id} />
      <div className="flex-1 flex p-16 ml-64">Notebook Content</div>
    </>
  );
};

export default NotebookView;
