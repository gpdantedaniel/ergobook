import { Oval } from "react-loader-spinner";

const NotebookCardLoading = () => {
  return (
    <li
      className="
        theme-secondary-card border
        w-full md:w-48 md:h-64
        p-4 gap-3
        flex flex-col md:flex-col items-center justify-center
        rounded-lg
        animate-pulse
        transition
      "
    >
      <Oval
        height={40}
        width={40}
        color="rgb(203 213 225)"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="rgb(241 245 249)"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </li>
  );
};

export default NotebookCardLoading;
