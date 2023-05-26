import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, startTransition } from "react";

const Home = lazy(() => {
  return new Promise((resolve) => {
    startTransition(() => {
      resolve(import("./page/Home"));
    });
  });
});

const Redirect = lazy(() => {
  return new Promise((resolve) => {
    startTransition(() => {
      resolve(import("./page/redirect"));
    });
  });
});

const Login = lazy(() => {
  return new Promise((resolve) => {
    startTransition(() => {
      resolve(import("./page/Login"));
    });
  });
});

const Register = lazy(() => {
  return new Promise((resolve) => {
    startTransition(() => {
      resolve(import("./page/Register"));
    });
  });
});

const Materi = lazy(() => {
  return new Promise((resolve) => {
    startTransition(() => {
      resolve(import("./page/Materi"));
    });
  });
});

const Filter = lazy(() => {
  return new Promise((resolve) => {
    startTransition(() => {
      resolve(import("./page/Filter"));
    });
  });
});

const Kuis = lazy(() => {
  return new Promise((resolve) => {
    startTransition(() => {
      resolve(import("./page/Kuis"));
    });
  });
});

const PageSoal = lazy(() => {
  return new Promise((resolve) => {
    startTransition(() => {
      resolve(import("./page/PageSoal"));
    });
  });
});

const Hasil = lazy(() => {
  return new Promise((resolve) => {
    startTransition(() => {
      resolve(import("./page/Hasil"));
    });
  });
});

const Nilai = lazy(() => {
  return new Promise((resolve) => {
    startTransition(() => {
      resolve(import("./page/Nilai"));
    });
  });
});

const Profile = lazy(() => {
  return new Promise((resolve) => {
    startTransition(() => {
      resolve(import("./page/Profile"));
    });
  });
});

const Bab = lazy(() => {
  return new Promise((resolve) => {
    startTransition(() => {
      resolve(import("./page/Bab"));
    });
  });
});

const UnggahM = lazy(() => {
  return new Promise((resolve) => {
    startTransition(() => {
      resolve(import("./page/UnggahM"));
    });
  });
});

const UnggahK = lazy(() => {
  return new Promise((resolve) => {
    startTransition(() => {
      resolve(import("./page/UnggahK"));
    });
  });
});

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> {/* selesai */}
        <Route path="/Login" element={<Login />} /> {/* selesai */}
        <Route path="/Register" element={<Register />} /> {/* selesai */}
        <Route path="/Materi" element={<Materi />} /> {/* selesai */}
        <Route path="/Materi/UnggahM" element={<UnggahM />} /> {/* selesai */}
        <Route path="/Kuis" element={<Kuis/>} /> {/* selesai */}
        <Route path="/Kuis/UnggahK" element={<UnggahK/>} /> {/* selesai */}
        <Route path="/Kuis/Soal" element={<PageSoal/>} />{/* selesai */}
        <Route path="/Kuis/Soal/Hasil" element={<Hasil/>} />{/* selesai */}
        <Route path="/Nilai" element={<Nilai/>} /> {/* selesai */}
        <Route path="/Profile" element={<Profile/>} /> {/* selesai */}
        <Route path="*" element={<Redirect />}/> {/* selesai */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
