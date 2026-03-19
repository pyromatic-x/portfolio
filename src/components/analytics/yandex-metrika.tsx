"use client";

import Image from "next/image";
import Script from "next/script";
import { useEffect } from "react";

export const YandexMetrika = () => {
	useEffect(() => {
		if (typeof window !== "undefined" && window.ym) {
			window.ym(108153733, "init", {
				webvisor: true,
				clickmap: true,
				accurateTrackBounce: true,
				trackLinks: true,
			});
		}
	}, []);

	return (
		<>
			<Script
				id="yandex-metrika"
				strategy="afterInteractive"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: skip
				dangerouslySetInnerHTML={{
					__html: `
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
          `,
				}}
			/>
			<noscript>
				<div>
					<Image
						width={0}
						height={0}
						src="https://mc.yandex.ru/watch/108153733"
						style={{ position: "absolute", left: "-9999px" }}
						alt=""
					/>
				</div>
			</noscript>
		</>
	);
};
