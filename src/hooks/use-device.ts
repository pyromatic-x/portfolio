import { useEffect, useState } from "react";

export interface TDeviceInfo {
	isMobile: boolean;
	isTablet: boolean;
	isDesktop: boolean;
}

export const useDevice = (): TDeviceInfo => {
	const [deviceInfo, setDeviceInfo] = useState<TDeviceInfo>({
		isMobile: false,
		isTablet: false,
		isDesktop: false,
	});

	useEffect(() => {
		const checkDevice = () => {
			const width = window.innerWidth;
			setDeviceInfo({
				isMobile: width < 768,
				isTablet: width >= 768 && width < 1024,
				isDesktop: width >= 1024,
			});
		};

		checkDevice();
		window.addEventListener("resize", checkDevice);

		return () => window.removeEventListener("resize", checkDevice);
	}, []);

	return deviceInfo;
};
