import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useRef, useEffect } from "react";

function CompilationError(props) {
  const { runTestCases, runData } = props;
  const containerRef = useRef(null);
  useEffect(() => {
    containerRef.current.scrollIntoView();
  }, [runData]);
  return (
    <>
      {runTestCases && (
        <div className="bg-[#1f1f1f] w-full h-fit mb-10" ref={containerRef}>
          <div className="pl-5 py-4">
            <h1 className="text-[#CC3333] text-2xl font-semibold">
              Compilation Error :(
            </h1>
          </div>
          <div className=" text-[#c1bbb3] px-5">
            <p className="bg-[#0D0D0D] py-1 pl-3">
              Check the compiler output, fix the error and try again.
            </p>
          </div>
          <div className="px-5 text-[#c1bbb3] py-3">
            <p className="font-semibold text-lg">Compile Message</p>
            <div className="bg-[#0D0D0D] py-2 pl-3 whitespace-pre">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {runData[0].compile_output || runData[0].stderr}
              </ReactMarkdown>
            </div>
          </div>
          <div className="text-[#c1bbb3] px-5">
            <p className="font-semibold text-lg">Exit Status</p>
            <div className="bg-[#0D0D0D] py-3 pl-3">{runData[0].status_id}</div>
          </div>
          <div>&nbsp;</div>
        </div>
      )}
    </>
  );
}

export default CompilationError;
