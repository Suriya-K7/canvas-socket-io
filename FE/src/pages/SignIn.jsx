import { useContext, useState } from "react";
import DataContext from "../context/DataContext";
import { LogoIcon } from "../assets/icons";
import ModalBox from "../components/ModalBox";
import { DEMO_DATA } from "../data/constants";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = useState(false);

    const { handleLogin } = useContext(DataContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(email, password);
    };

    return (
        <div className="flex min-h-screen bg-gray-900 flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <LogoIcon className="text-indigo-500 mx-auto h-10 w-auto" />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign in to your account</h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-white">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-white">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
                <p className="font-semibold text-indigo-400 hover:text-indigo-300 mt-10 text-center text-sm/6 cursor-pointer"
                    onClick={() => setOpen(true)}>
                    Demo Users details
                </p>
            </div>
            <ModalBox onClose={() => setOpen(false)} open={open}>
                {DEMO_DATA.map((item) => (
                    <div key={item.id} className="flex flex-col gap-1">
                        <p className="text-sm leading-6">Email: {item.email}</p>
                        <p className="text-sm leading-6">Password: {item.password}</p>
                    </div>
                ))}

            </ModalBox>
        </div>
    );
};

export default SignIn;