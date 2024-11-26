import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const ApplicationLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div>
        <Sidebar />
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ApplicationLayout;