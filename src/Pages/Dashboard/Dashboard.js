import React, { useEffect, useRef, useState } from "react";
import Main from "../../Layouts/Main";
import DashboardCard from "../../Components/DashboardCard";
import HomeCarousel from "../../Components/HomeCarousel";
import DashboardSampleProductBar from "../../Components/DashboardSampleProductBar";
import { useSelector, useDispatch } from "react-redux";
// import HeroSection from "../../Components/HeroSection";
import {
	getProducts,
	clearState,
	productSelector,
} from "../../Services/Slices/productSlice";
import { Link } from "react-router-dom";
import Catagories from "./Catagories";
import { getAllProducts } from "../../api/api";
import toast from "react-hot-toast";
import Paginate from "../../Components/Paginate";
import HeroSection from "./HeroSection";
import Carousel from "react-elastic-carousel";

const Dashboard = ({ toggle, handleToggle }) => {
	const dispatch = useDispatch();
	const { isFetching, errorMessage, isSuccess, result, count } =
		useSelector(productSelector);
	let limit = 10;
	let toastWaiting;
	const [pageCount, setpageCount] = useState(0);

	const handlePageClick = async (data) => {
		console.log(data.selected);
		let currentPage = data.selected + 1;
		// const commentsFormServer = await fetchComments(currentPage);
		fetchProducts(currentPage);
		// setItems(commentsFormServer);
		// scroll to the top
		// window.scrollTo(0, 0);
	};
	const fetchProducts = async (currentPage) => {
		// const data = await res.json();
		dispatch(getProducts(currentPage));
	};

	const carouselRef = useRef(null);
	const Loop = (currentItem) => {
		if (currentItem.index == 1) {
			setTimeout(() => {
				carouselRef.current.goTo(0);
			}, 4500);
		}
	};

	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);

	useEffect(() => {
		if (isFetching) {
			toast.loading("Waiting...", {
				id: toastWaiting,
			});
		}
	}, [isFetching]);
	useEffect(() => {
		if (errorMessage) {
			// toast.dismiss();
			toast.error(errorMessage, {
				id: toastWaiting,
			});
			dispatch(clearState());
		}
		if (isSuccess) {
			toast.dismiss(toastWaiting, {
				id: toastWaiting,
			});
			setpageCount(Math.ceil(count / limit));
			toast.success("Fetch Successfully");
		}
	}, [errorMessage, isSuccess]);

	return (
		<div>
			<Main toggle={toggle} handleToggle={handleToggle}>
				<section className='text-gray-600 body-font'>
					<Carousel
						onChange={Loop}
						ref={carouselRef}
						showArrows={false}
						enableSwipe={false}
						enableMouseSwipe={false}
						disableArrowsOnEnd={false}
						pagination={false}
						itemPadding={[5, 10]}
						itemsToShow={1}
						itemsToScroll={1}
						enableAutoPlay
						autoPlaySpeed={4500}>
						{/* <HomeCarousel /> */}
						<HeroSection />
					</Carousel>
					<Catagories />
					{/* <DashboardSampleProductBar /> */}
					<div className='flex flex-row justify-center items-center '>
						<div>
							<a
								className='text-2xl font-semibold text-gray-800 transition-colors duration-200 transform dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300'
								href='/catagories?cg=Injera'>
								Our Products
							</a>
						</div>
						<div className='flex md:hidden'>
							<button
								type='button'
								className='text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400'
								aria-label='toggle menu'>
								<svg viewBox='0 0 24 24' className='w-6 h-6 fill-current'>
									<path
										fillRule='evenodd'
										d='M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z'></path>
								</svg>
							</button>
						</div>
					</div>
					{/* <Paginate className='' pageCount={pageCount} handlePageClick={handlePageClick} /> */}
				</section>
			</Main>
		</div>
	);
};

export default Dashboard;
