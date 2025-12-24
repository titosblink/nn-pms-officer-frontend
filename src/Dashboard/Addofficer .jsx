import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "./Header";
import Sidenav from "./Sidenav";
import Footer from "./Footer";

export default function Addofficer() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    // LOAD USER
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (!savedUser) {
            navigate("/");
            return;
        }
        setUser(JSON.parse(savedUser));
    }, [navigate]);

    // LOGOUT
    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/");
    };

    // FORM STATE
    const [form, setForm] = useState({
        surname: "",
        firstname: "",
        othername: "",
        gender: "",
        religion: "",
        serviceNumber: "",
        state: "",
        lga: "",
        passport: null,
    });

    const [passportPreview, setPassportPreview] = useState(null);
    const [lgas, setLgas] = useState([]);
    const [success, setSuccess] = useState(false);

    // STATES & LGAs (abbreviated, add full list as needed)
    const statesWithLgas = {
        Abia: ["Aba North", "Aba South", "Arochukwu", "Bende", "Ikwuano", "Isiala Ngwa North","Isiala Ngwa South", "Isuikwuato", "Nsit Atai", "Obi Ngwa", "Ohafia", "Osisioma","Ugwunagbo", "Ukwa East", "Ukwa West", "Umuahia North", "Umuahia South"],
        Adamawa: ["Demsa", "Fufore", "Ganye", "Girei", "Gombi", "Guyuk", "Hong", "Jada", "Lamurde","Madagali", "Maiha", "Mayo-Belwa", "Michika", "Mubi North", "Mubi South","Numan", "Shelleng", "Song", "Toungo", "Yola North", "Yola South"],
        AkwaIbom: ["Abak", "Eastern Obolo", "Eket", "Esit Eket", "Essien Udim", "Etim Ekpo","Etinan", "Ibeno", "Ibesikpo Asutan", "Ibiono Ibom", "Ika", "Ikono", "Ikot Abasi","Ikot Ekpene", "Ini", "Itu", "Mbo", "Mkpat Enin", "Nsit Atai", "Nsit Ibom","Nsit Ubium", "Obot Akara", "Okobo", "Onna", "Oron", "Oruk Anam", "Udung Uko","Ukanafun", "Uruan", "Urue Offong Oruko", "Uyo"],
        Anambra: ["Aguata", "Anambra East", "Anambra West", "Awka North", "Awka South", "Ayamelum", "Dunukofia", "Ekwusigo", "Idemili North", "Idemili South", "Ihiala", "Njikoka", "Nnewi North", "Nnewi South", "Ogbaru", "Onitsha North", "Onitsha South", "Orumba North", "Orumba South", "Oyi"],
        Bauchi: ["Alkaleri", "Bauchi", "Bogoro", "Damban", "Darazo", "Dass", "Gamawa", "Ganjuwa", "Giade", "Itas/Gadau", "Jama'are", "Katagum", "Kirfi", "Misau", "Ningi", "Shira", "Tafawa Balewa", "Toro", "Warji", "Zaki"],
        Bayelsa: ["Brass", "Ekeremor", "Kolokuma/Opokuma", "Nembe", "Ogbia", "Sagbama", "Southern Ijaw", "Yenagoa"],
        Benue: ["Ado", "Agatu", "Apa", "Buruku", "Gboko", "Guma", "Gwer East", "Gwer West", "Katsina-Ala", "Konshisha", "Kwande", "Logo", "Makurdi", "Obi", "Ogbadibo", "Ohimini", "Oju", "Okpokwu", "Oturkpo", "Tarka", "Ukum", "Ushongo", "Vandeikya"],
        Borno: ["Abadam", "Askira/Uba", "Bama", "Bayo", "Biu", "Chibok", "Damboa", "Dikwa", "Gubio", "Guzamala", "Gwoza", "Hawul", "Jere", "Kaga", "Kala/Balge", "Konduga", "Kukawa", "Kwaya Kusar", "Mafa", "Magumeri", "Maiduguri", "Marte", "Mobbar", "Monguno", "Ngala", "Nganzai", "Shani"],
        CrossRiver: ["Abi", "Akamkpa", "Akpabuyo", "Bakassi", "Bekwarra", "Biase", "Boki", "Calabar Municipal", "Calabar South", "Etung", "Ikom", "Obanliku", "Obubra", "Obudu", "Odukpani", "Ogoja", "Yakurr", "Yala"],
        Delta: ["Aniocha North", "Aniocha South", "Bomadi", "Burutu", "Ethiope East", "Ethiope West", "Ika North East", "Ika South", "Isoko North", "Isoko South", "Ndokwa East", "Ndokwa West", "Okpe", "Oshimili North", "Oshimili South", "Patani", "Sapele", "Udu", "Ughelli North", "Ughelli South", "Ukwuani", "Uvwie", "Warri North", "Warri South", "Warri South West"],
        Ebonyi: ["Abakaliki", "Afikpo North", "Afikpo South", "Ebonyi", "Ezza North", "Ezza South", "Ikwo", "Ishielu", "Ivo", "Izzi", "Ohaozara", "Ohaukwu", "Onicha"],
        Edo: ["Akoko-Edo", "Egor", "Esan Central", "Esan North-East", "Esan South-East", "Esan West", "Etsako Central", "Etsako East", "Etsako West", "Igueben", "Ikpoba-Okha", "Oredo", "Orhionmwon", "Ovia North-East", "Ovia South-West", "Owan East", "Owan West", "Uhunmwonde"],
        Ekiti: ["Ado Ekiti", "Efon", "Ekiti East", "Ekiti South West", "Ekiti West", "Emure", "Gbonyin", "Ido Osi", "Ijero", "Ikere", "Ikole", "Ilejemeje", "Irepodun/Ifelodun", "Ise/Orun", "Moba", "Oye"],
        Enugu: ["Aninri", "Awgu", "Enugu East", "Enugu North", "Enugu South", "Ezeagu", "Igbo-Etiti", "Igbo-Eze North", "Igbo-Eze South", "Isi-Uzo", "Nkanu East", "Nkanu West", "Nsukka", "Oji-River", "Udenu", "Udi", "Uzo-Uwani"],
        Gombe: ["Akko", "Balanga", "Billiri", "Dukku", "Funakaye", "Gombe", "Kaltungo", "Kwami", "Nafada", "Shongom", "Yamaltu/Deba"],
        Imo: ["Aboh Mbaise", "Ahiazu Mbaise", "Ehime Mbano", "Ezinihitte", "Ideato North", "Ideato South", "Ihitte/Uboma", "Ikeduru", "Isiala Mbano", "Isu", "Mbaitoli", "Ngor Okpala", "Njaba", "Nkwerre", "Nwangele", "Obowo", "Oguta", "Ohaji/Egbema", "Okigwe", "Orlu", "Orsu", "Oru East", "Oru West", "Owerri Municipal", "Owerri North", "Owerri West"],
        Jigawa: ["Auyo", "Babura", "Biriniwa", "Birnin Kudu", "Buji", "Dutse", "Gagarawa", "Garki", "Gumel", "Guri", "Gwaram", "Gwiwa", "Hadejia", "Jahun", "Kafin Hausa", "Kaugama", "Kazaure", "Kiri Kasama", "Kiyawa", "Kaugama", "Malam Madori", "Miga", "Ringim", "Roni", "Sule Tankarkar", "Taura", "Yankwashi"],
        Kaduna: ["Birnin Gwari", "Chikun", "Giwa", "Igabi", "Ikara", "Jaba", "Jema'a", "Kachia", "Kaduna North", "Kaduna South", "Kagarko", "Kajuru", "Kaura", "Kauru", "Kubau", "Kudan", "Lere", "Makarfi", "Sabon Gari", "Sanga", "Soba", "Zango Kataf", "Zaria"],
        Kano: ["Ajingi", "Albasu", "Bagwai", "Bebeji", "Bichi", "Bunkure", "Dala", "Dambatta", "Dawakin Kudu", "Dawakin Tofa", "Doguwa", "Fagge", "Gabasawa", "Garko", "Garun Mallam", "Gaya", "Gezawa", "Gwale", "Gwarzo", "Kabo", "Kano Municipal", "Karaye", "Kibiya", "Kiru", "Kumbotso", "Kunchi", "Kura", "Madobi", "Makoda", "Minjibir", "Nasarawa", "Rano", "Rimin Gado", "Rogo", "Shanono", "Sumaila", "Takai", "Tarauni", "Tofa", "Tsanyawa", "Tudun Wada", "Ungogo", "Warawa", "Wudil"],
        Katsina: ["Bakori", "Batagarawa", "Batsari", "Baure", "Bindawa", "Charanchi", "Dan Musa", "Dandume", "Danja", "Daura", "Dutsi", "Dutsin-Ma", "Faskari", "Funtua", "Ingawa", "Jibia", "Kafur", "Kaita", "Kankara", "Kankia", "Katsina", "Kurfi", "Kusada", "Mai'Adua", "Malumfashi", "Mani", "Mashi", "Musawa", "Rimi", "Sabuwa", "Safana", "Sandamu", "Zango"],
        Kebbi: ["Aleiro", "Arewa Dandi", "Argungu", "Augie", "Bagudo", "Birnin Kebbi", "Bunza", "Dandi", "Fakai", "Gwandu", "Jega", "Kalgo", "Koko/Besse", "Maiyama", "Ngaski", "Sakaba", "Shanga", "Suru", "Wasagu/Danko", "Yauri", "Zuru"],
        Kogi: ["Adavi", "Ajaokuta", "Ankpa", "Bassa", "Dekina", "Ibaji", "Idah", "Igalamela-Odolu", "Ijumu", "Kabba/Bunu", "Kogi", "Lokoja", "Mopa-Muro", "Ofu", "Ogori/Magongo", "Okehi", "Okene", "Olamaboro", "Omala", "Yagba East", "Yagba West"],
        Kwara: ["Asa", "Baruten", "Edu", "Ekiti", "Ifelodun", "Ilorin East", "Ilorin South", "Ilorin West", "Irepodun", "Isin", "Kaiama", "Moro", "Offa", "Oke Ero", "Oyun", "Pategi"],
        Lagos: ["Agege", "Ajeromi-Ifelodun", "Alimosho", "Amuwo-Odofin", "Apapa", "Badagry", "Epe", "Eti-Osa", "Ibeju-Lekki", "Ifako-Ijaiye", "Ikeja", "Ikorodu", "Kosofe", "Lagos Island", "Lagos Mainland", "Mushin", "Ojo", "Oshodi-Isolo", "Shomolu", "Surulere"],
        Nasarawa: ["Akwanga", "Awe", "Doma", "Karu", "Keana", "Keffi", "Kokona", "Lafia", "Nasarawa", "Nasarawa Egon", "Obi", "Toto", "Wamba"],
        Niger: ["Agaie", "Agwara", "Bida", "Borgu", "Bosso", "Chanchaga", "Edati", "Gbako", "Gurara", "Katcha", "Kontagora", "Lapai", "Lavun", "Magama", "Mariga", "Mashegu", "Mokwa", "Moya", "Paikoro", "Rafi", "Rijau", "Shiroro", "Suleja", "Tafa", "Wushishi"],
        Ogun: ["Abeokuta North", "Abeokuta South", "Ado-Odo/Ota", "Egbado North", "Egbado South", "Ewekoro", "Ifo", "Ijebu East", "Ijebu North", "Ijebu North East", "Ijebu Ode", "Ikenne", "Imeko Afon", "Ipokia", "Obafemi Owode", "Odeda", "Odogbolu", "Ogun Waterside", "Remo North", "Sagamu"],
        Ondo: ["Akoko North-East", "Akoko North-West", "Akoko South-East", "Akoko South-West", "Akure North", "Akure South", "Ese Odo", "Idanre", "Ifedore", "Ilaje", "Ile Oluji/Okeigbo", "Irele", "Odigbo", "Okitipupa", "Ondo East", "Ondo West", "Ose", "Owo"],
        Osun: ["Atakumosa East", "Atakumosa West", "Aiyedaade", "Aiyedire", "Boluwaduro", "Boripe", "Ede North", "Ede South", "Egbedore", "Ejigbo", "Ifelodun", "Ila", "Ilesa East", "Ilesa West", "Irepodun", "Irewole", "Isokan", "Iwo", "Obokun", "Odo Otin", "Ola Oluwa", "Olorunda", "Oriade", "Orolu", "Osogbo"],
        Oyo: ["Afijio", "Akinyele", "Atiba", "Atisbo", "Egbeda", "Ibadan North", "Ibadan North-East", "Ibadan North-West", "Ibadan South-East", "Ibadan South-West", "Ibarapa Central", "Ibarapa East", "Ibarapa North", "Ido", "Irepo", "Iseyin", "Itesiwaju", "Iwajowa", "Kajola", "Lagelu", "Ogbomosho North", "Ogbomosho South", "Ogo Oluwa", "Olorunsogo", "Oluyole", "Ona Ara", "Orelope", "Ori Ire", "Oyo East", "Oyo West", "Saki East", "Saki West", "Surulere"],
        Plateau: ["Barikin Ladi", "Bassa", "Bokkos", "Jos East", "Jos North", "Jos South", "Kanam", "Kanke", "Langtang North", "Langtang South", "Mangu", "Mikang", "Pankshin", "Qua'an Pan", "Riyom", "Shendam", "Wase"],
        Rivers: ["Abua/Odual", "Ahoada East", "Ahoada West", "Akuku Toru", "Andoni", "Asari-Toru", "Bonny", "Degema", "Eleme", "Emohua", "Etche", "Gokana", "Ikwerre", "Khana", "Obio/Akpor", "Ogba/Egbema/Ndoni", "Ogu/Bolo", "Okrika", "Omuma", "Opobo/Nkoro", "Oyigbo", "Port Harcourt", "Tai"],
        Sokoto: ["Binji", "Bodinga", "Dange Shuni", "Gada", "Goronyo", "Gudu", "Gwadabawa", "Illela", "Isa", "Kebbe", "Kware", "Rabah", "Sabon Birni", "Shagari", "Silame", "Sokoto North", "Sokoto South", "Tambuwal", "Tangaza", "Tureta", "Wamako", "Wurno", "Yabo"],
        Taraba: ["Ardo-Kola", "Bali", "Donga", "Gashaka", "Gassol", "Ibi", "Jalingo", "Karim Lamido", "Kumi", "Lau", "Sardauna", "Takum", "Ussa", "Wukari", "Yorro", "Zing"],
        Yobe: ["Bursari", "Damaturu", "Fika", "Fune", "Geidam", "Gujba", "Gulani", "Jakusko", "Karasuwa", "Machina", "Nangere", "Nguru", "Potiskum", "Tarmuwa", "Yunusari", "Yusufari"],
        Zamfara: ["Anka", "Bakura", "Birnin Magaji", "Bukkuyum", "Bungudu", "Gummi", "Gusau", "Kaura Namoda", "Maradun", "Maru", "Shinkafi", "Talata Mafara", "Tsafe", "Zurmi"],
        FCT: ["Abaji", "Bwari", "Gwagwalada", "Kuje", "Kwali", "Municipal"]
    };

    // HANDLE CHANGE
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // HANDLE PASSPORT FILE
    const handlePassport = (e) => {
        const file = e.target.files[0];
        setForm({ ...form, passport: file });
        if (file) setPassportPreview(URL.createObjectURL(file));
    };

    useEffect(() => {
        return () => {
            if (passportPreview) URL.revokeObjectURL(passportPreview);
        };
    }, [passportPreview]);

    // STATE CHANGE → LOAD LGAs
    const handleStateChange = (e) => {
        const state = e.target.value;
        setForm({ ...form, state, lga: "" });
        setLgas(statesWithLgas[state] || []);
    };

    // SUBMIT FORM
    const handleSubmit = async (e) => {
        e.preventDefault();

        const requiredFields = ["surname", "firstname", "gender", "serviceNumber", "state", "lga", "passport"];
        for (let field of requiredFields) {
            if (!form[field]) {
                alert(`Please fill ${field}`);
                return;
            }
        }

        try {
            const formData = new FormData();
            Object.keys(form).forEach(key => {
                formData.append(key, form[key]);
            });

            const response = await axios.post("http://localhost:5000/api/register", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            const savedOfficer = response.data.data;

            setSuccess(true);

            // Clear form fields except passport preview (Cloudinary)
            setForm({
                surname: "", firstname: "", othername: "", gender: "", religion: "",
                serviceNumber: "", state: "", lga: "", passport: null
            });

            setPassportPreview(savedOfficer.passportUrl);

        } catch (err) {
            console.error(err);
            alert("Error saving record.");
        }
    };

    return (

        <>
            <div className="bg-base-200 flex min-h-screen flex-col">
                {/* Layout Navbar */}
                {/* ---------- HEADER ---------- */}
                <div className="bg-base-100 border-base-content/20 lg:ps-75 sticky top-0 z-50 flex border-b">
                    <div className="mx-auto w-full max-w-7xl">
                        <nav className="navbar py-2">
                            <div className="navbar-start items-center gap-2">
                                <button type="button" className="btn btn-soft btn-square btn-sm lg:hidden" aria-haspopup="dialog" aria-expanded="false" aria-controls="layout-sidebar" data-overlay="#layout-sidebar">
                                    <span className="icon-[tabler--menu-2] size-4.5" />
                                </button>
                                {/* Search  */}
                                <div className="input no-focus border-0 px-0">
                                    <span className="icon-[tabler--search] text-base-content/80 my-auto me-2 size-4 shrink-0" />
                                    <input type="search" className="grow placeholder:text-sm" placeholder="Type to Search..." id="kbdInput" />
                                    <label className="sr-only" htmlFor="kbdInput">Search</label>
                                </div>
                            </div>
                            <div className="navbar-end items-end gap-6">
                                {/* GitHub Button */}
                                <div className="max-md:hidden">
                                    <Link className="github-button" href="#" data-icon="octicon-star" data-size="large" data-show-count="true">Welcome</Link>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
                {/* Menu */}
                <aside id="layout-sidebar" className="overlay overlay-open:translate-x-0 drawer drawer-start sm:w-75 inset-y-0 start-0 hidden h-full [--auto-close:lg] lg:z-50 lg:block lg:translate-x-0 lg:shadow-none" aria-label="Sidebar" tabIndex={-1}>
                    <div className="drawer-body border-base-content/20 h-full border-e p-0">
                        <div className="flex h-full max-h-full flex-col">
                            <button type="button" className="btn btn-text btn-circle btn-sm absolute end-3 top-3 lg:hidden" aria-label="Close" data-overlay="#layout-sidebar">
                                <span className="icon-[tabler--x] size-4.5" />
                            </button>
                            <div className="text-base-content border-base-content/20 flex flex-col items-center gap-4 border-b px-4 py-6">
                                <div className="avatar">
                                    <div className="size-17 rounded-full">
                                        <img src="assets/img/avatars/2.png" alt="avatar" />
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-base-content text-lg font-semibold">OC Aluu</h3>
                                    <p className="text-base-content/80">aluu.nn4545@navy.mil.ng</p>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        className="w-full text-left px-4 py-2 hover:bg-base-200 flex items-center gap-2"
                                        onClick={handleLogout}
                                    >
                                        <span className="icon-[tabler--logout] size-5" />
                                        Logout
                                    </button>
                                </div>
                            </div>
                            <div className="h-full overflow-y-auto">
                                <ul className="accordion menu menu-sm gap-1 p-3">
                                    {/* Accordion Menu Item (Level 0) */}
                                    <li className="active accordion-item" id="dashboard">
                                        <button className="accordion-toggle accordion-item-active:bg-neutral/10 inline-flex w-full items-center p-2 text-start text-sm font-normal" aria-controls="dashboard-collapse-dashboard" aria-expanded="true">
                                            <span className="icon-[tabler--dashboard] size-4.5" />
                                            <span className="grow">Dashboard</span>
                                        </button>
                                    </li>
                                    {/* Section Divider */}
                                    <li className="text-base-content/50 before:bg-base-content/20 mt-2 p-2 text-xs uppercase before:absolute before:-start-3 before:top-1/2 before:h-0.5 before:w-2.5">Pages</li>
                                    {/* Accordion Menu Item (Level 0) */}
                                    <li className="accordion-item" id="account-settings">
                                        <Link
                                            to="/add-officer"
                                            className="accordion-toggle inline-flex w-full items-center p-2 text-start text-sm font-normal"
                                            onClick={() => setActiveItem("officers")}
                                        >
                                            <span className="icon-[tabler--users] size-4.5"></span>
                                            <span className="grow">Officerss</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </aside>
                {/* / Menu */}
                {/* Layout Container */}
                <div className="lg:ps-75 flex grow flex-col">
                    {/* Content */}
                    <main className="mx-auto w-full max-w-[1280px] flex-1 grow space-y-6 p-6">
                        {/* Stats */}
                        <div className="shadow-base-300/10 rounded-box bg-base-100 flex gap-4 p-6 shadow-md max-xl:flex-col">
                            <Link href="#">
                                <div className="flex flex-1 gap-4 max-sm:flex-col">
                                    <div className="flex flex-1 flex-col gap-4">
                                        <div className="text-base-content flex items-center gap-2">
                                            <div className="avatar avatar-placeholder">
                                                <div className="bg-base-200 rounded-field size-9">
                                                    <span className="icon-[tabler--users] size-5" />
                                                </div>
                                            </div>
                                            <h5 className="text-lg font-medium">Officers</h5>
                                        </div>
                                        <div>
                                            <div className="text-base-content text-xl font-semibold">5,000</div>
                                            <div className="flex items-center gap-2 text-sm font-semibold">
                                                <span className="text-base-content/50 font-medium">Click to view</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider sm:divider-horizontal" />
                                </div>
                            </Link>
                        </div>
                    </main>
                    {/* / Content */}
                    {/* Footer: Start */}
                    <footer className="mx-auto w-full max-w-[1280px] px-6 py-3.5 text-sm">
                        <div className="flex items-center justify-between gap-3 max-lg:flex-col">
                            <p className="text-base-content text-center">
                                ©2025
                                <Link href="#" className="text-primary"> Nigerian Navy</Link>
                            </p>
                            <div className="justify-enter flex items-center gap-4 max-sm:flex-col">
                                <Link href="#" className="link link-primary link-animated font-normal" aria-label="More Templates" target="_blank">Designed by OC Aluu</Link>
                            </div>
                        </div>
                    </footer>
                    {/* Footer: End */}
                </div>
                {/* / Layout Container */}
            </div>


        </>
    );
}
