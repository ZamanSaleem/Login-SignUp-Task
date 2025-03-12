import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  House,
  File,
  MessageSquareText,
  BellRing,
  MapPin,
  ChartNoAxesCombined,
  UploadCloud,
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
  {
    id: "home",
    label: "home",
    path: "/admin/home",
    icon: <House />,
  },
  {
    id: "file",
    label: "file",
    path: "/admin/file",
    icon: <File />,
  },
  {
    id: "messages",
    label: "messages",
    path: "/admin/messages",
    icon: <MessageSquareText />,
  },
  {
    id: "notification",
    label: "notification",
    path: "/admin/notification",
    icon: <BellRing />,
  },
  {
    id: "location",
    label: "location",
    path: "/admin/location",
    icon: <MapPin />,
  },
  {
    id: "graph",
    label: "graph",
    path: "/admin/graph",
    icon: <ChartNoAxesCombined />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            setOpen ? setOpen(false) : null;
          }}
          className="flex text-xl items-center cursor-pointer gap-2 rounded-md px-3 py-2 bg-gray-800 text-white hover:bg-muted hover:text-gray-800"
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

function AdminSidebar({ open, setOpen }) {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  return (
    <Fragment >
      <Sheet open={open} onOpenChange={setOpen} >
        <SheetContent side="left" className="w-64 bg-gray-800">
          <div className="flex flex-col  h-full">
            <SheetHeader className="border-b">
              <SheetTitle className='flex gap-6 text-white'>
                <ChartNoAxesCombined size={30} />
                Admin panel
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col items-center py-4">
              <label className="relative flex items-center justify-center w-24 h-24 rounded-full bg-gray-700 cursor-pointer hover:bg-gray-600">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Uploaded Preview"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <UploadCloud size={40} className="text-white" />
                )}
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                  accept="image/*"
                />
              </label>
            </div>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col bg-gray-800 border-r p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/home")}
          className="flex cursor-pointer items-center gap-2"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-xl font-extrabold text-white">Admin Panel</h1>
        </div>
        <div className="flex flex-col items-center py-4">
          <label className="relative flex items-center justify-center w-24 h-24 rounded-full bg-gray-700 cursor-pointer hover:bg-gray-600">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Uploaded Preview"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <UploadCloud size={40} className="text-white" />
            )}
            <input
              type="file"
              className="hidden"
              onChange={handleImageUpload}
              accept="image/*"
            />
          </label>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default AdminSidebar;