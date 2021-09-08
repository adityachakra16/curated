import React from "react";
import { GoogleLogin } from "react-google-login";

const EmailLogin = (props) => {
  return (
    <div
      className="flex flex-col justify-center items-center"
      style={{ height: "90vh" }}
    >
      <div className="flex flex-col shadow-xl p-2 h-2/3 w-1/3">
        {/* <span className="text-center">Authenticate</span> */}
        <div className="flex flex-row justify-center items-center">
          <svg
            class="position-relative"
            // style={{ left: "-304px" }}
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="100"
            viewBox="150 0 800 400"
            fill="none"
          >
            <path
              d="M318.7 157.299H357.8C357.8 161.299 357.6 164.999 357.3 168.299C357 171.599 356.3 174.599 355.3 177.399C353.9 181.399 352 184.899 349.6 187.999C347.2 190.999 344.3 193.599 341.1 195.599C337.9 197.599 334.3 199.199 330.4 200.199C326.5 201.299 322.4 201.799 318.1 201.799C312.2 201.799 306.8 200.799 301.9 198.899C297.1 196.999 292.9 194.199 289.4 190.799C285.9 187.199 283.2 182.999 281.3 178.099C279.4 173.099 278.4 167.699 278.4 161.699C278.4 155.799 279.3 150.399 281.2 145.499C283.1 140.499 285.9 136.299 289.3 132.799C292.9 129.299 297.1 126.599 302.1 124.699C307.1 122.799 312.6 121.799 318.7 121.799C326.6 121.799 333.5 123.499 339.5 126.899C345.5 130.299 350.2 135.599 353.7 142.799L335 150.499C333.3 146.299 331 143.399 328.2 141.599C325.5 139.799 322.3 138.899 318.8 138.899C315.9 138.899 313.2 139.499 310.8 140.599C308.4 141.699 306.3 143.199 304.6 145.299C302.9 147.299 301.6 149.799 300.6 152.599C299.7 155.499 299.2 158.699 299.2 162.199C299.2 165.399 299.6 168.399 300.4 171.099C301.3 173.799 302.5 176.199 304.2 178.199C305.9 180.199 308 181.799 310.4 182.899C312.9 183.999 315.8 184.499 319 184.499C320.9 184.499 322.8 184.299 324.6 183.899C326.4 183.399 328 182.699 329.4 181.799C330.9 180.799 332.1 179.499 333 177.999C333.9 176.499 334.6 174.599 334.9 172.399H318.7V157.299ZM455 139.799V201.799H434V139.799H417V121.799H472V139.799H455ZM545 149.199C540.4 143.599 534.8 140.799 528.1 140.799C525.1 140.799 522.4 141.299 519.8 142.399C517.3 143.499 515.2 144.999 513.3 146.799C511.5 148.599 510 150.799 509 153.399C508 155.999 507.5 158.699 507.5 161.699C507.5 164.699 508 167.499 509 170.099C510.1 172.699 511.5 174.899 513.3 176.799C515.2 178.699 517.4 180.199 519.9 181.199C522.4 182.299 525.1 182.799 528 182.799C534.3 182.799 540 180.099 545 174.699V198.099L543 198.799C540 199.899 537.2 200.599 534.5 201.099C531.9 201.599 529.3 201.899 526.7 201.899C521.5 201.899 516.4 200.899 511.6 198.999C506.8 196.999 502.6 194.199 498.9 190.599C495.3 186.999 492.3 182.699 490.1 177.799C487.9 172.799 486.8 167.399 486.8 161.599C486.8 155.799 487.9 150.399 490 145.599C492.2 140.699 495.1 136.499 498.8 132.999C502.5 129.399 506.8 126.699 511.6 124.699C516.4 122.699 521.5 121.699 526.8 121.699C529.8 121.699 532.8 121.999 535.7 122.699C538.7 123.299 541.8 124.299 545 125.599V149.199ZM586.2 161.799C586.2 164.799 586.8 167.599 587.9 170.199C589 172.799 590.6 174.999 592.5 176.899C594.4 178.799 596.7 180.299 599.3 181.299C601.9 182.299 604.7 182.799 607.6 182.799C610.5 182.799 613.2 182.299 615.8 181.299C618.4 180.199 620.7 178.699 622.7 176.899C624.7 174.999 626.3 172.799 627.4 170.199C628.5 167.599 629.1 164.899 629.1 161.799C629.1 158.699 628.5 155.999 627.4 153.399C626.3 150.799 624.7 148.599 622.7 146.699C620.8 144.799 618.5 143.399 615.8 142.399C613.2 141.299 610.5 140.799 607.6 140.799C604.7 140.799 602 141.299 599.3 142.399C596.7 143.399 594.5 144.899 592.5 146.699C590.6 148.599 589 150.799 587.9 153.399C586.8 155.999 586.2 158.799 586.2 161.799ZM565.6 161.799C565.6 156.199 566.6 150.899 568.7 146.099C570.8 141.199 573.7 136.899 577.4 133.299C581.1 129.699 585.5 126.799 590.6 124.799C595.8 122.699 601.5 121.699 607.6 121.699C613.7 121.699 619.4 122.699 624.5 124.799C629.7 126.799 634.1 129.599 637.8 133.299C641.6 136.899 644.5 141.199 646.6 146.099C648.7 150.899 649.7 156.199 649.7 161.799C649.7 167.399 648.7 172.699 646.6 177.599C644.5 182.399 641.6 186.699 637.8 190.299C634.1 193.899 629.7 196.799 624.5 198.899C619.3 200.899 613.7 201.899 607.6 201.899C601.4 201.899 595.7 200.899 590.6 198.899C585.5 196.799 581.1 193.999 577.4 190.299C573.7 186.699 570.8 182.399 568.7 177.599C566.6 172.699 565.6 167.499 565.6 161.799ZM691 121.799V201.799H670V121.799H691ZM397 121.799V201.799H376V121.799H397ZM713 201.799V121.799H733L772 170.699V121.799H793V201.799H772.8L734 152.899V201.799H713Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <div className="flex flex-row justify-center items-center">
          <svg
            className="mb-2"
            // style={{ left: "-304px" }}
            xmlns="http://www.w3.org/2000/svg"
            width="250"
            height="250"
            viewBox="20 220 350 250"
            fill="none"
          >
            <g id="epiKf9BF41342">
              <g id="epiKf9BF41343">
                <path
                  id="epiKf9BF41344"
                  d="M68.4 410.2V303.4"
                  fill="none"
                  stroke="#02E2AC"
                  stroke-width="1"
                  stroke-miterlimit="10"
                ></path>
                <path
                  id="epiKf9BF41345"
                  d="M233.6 398.9V287.1"
                  fill="none"
                  stroke="#02E2AC"
                  stroke-width="1"
                  stroke-miterlimit="10"
                ></path>
                <path
                  id="epiKf9BF41346"
                  d="M330.7 460.2V430l34.4-45v30.2l-34.4 45z"
                  fill="#11BC92"
                  stroke="#02E2AC"
                  stroke-width="1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                ></path>
                <path
                  id="epiKf9BF41347"
                  d="M350 426v-12.4l14-18.6h5.5L356 427l-6-1z"
                  fill="#02E2AC"
                  stroke="#02E2AC"
                  stroke-width="1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                ></path>
                <path
                  id="epiKf9BF41348"
                  d="M356 426v-12.4l14-18.6v12.5L356 426z"
                  fill="#11BC92"
                  stroke="#02E2AC"
                  stroke-width="1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                ></path>
                <path
                  id="epiKf9BF41349"
                  d="M359.9 417.9c-.3.4-.9.2-.9-.3v-5.2c0-.1 0-.2.1-.3l7-8.9c.3-.4.9-.2.9.3v5.2c0 .1 0 .2-.1.3l-7 8.9z"
                  fill="#8C65F7"
                  stroke="none"
                  stroke-width="1"
                ></path>
                <path
                  id="epiKf9BF41350"
                  d="M34 444.2V414l131.2 30.5v30.2L34 444.2z"
                  fill="#11BC92"
                  stroke="#02E2AC"
                  stroke-width="1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                ></path>
                <path
                  id="epiKf9BF41351"
                  d="M165.2 474.7v-30.2L330.7 430v30.2l-165.5 14.5z"
                  fill="#02E2AC"
                  stroke="#02E2AC"
                  stroke-width="1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                ></path>
                <path
                  id="epiKf9BF41352"
                  d="M330.7 430l-165.5 14.5L34 414l34.3-44.9 165.5-14.5L365.1 385l-34.4 45z"
                  fill="#FFF"
                  stroke="#02E2AC"
                  stroke-width="1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                ></path>
                <path
                  id="epiKf9BF41353"
                  d="M276.3 420.2v-19l21.6-28.2v19l-21.6 28.2z"
                  fill="#02E2AC"
                  stroke="#02E2AC"
                  stroke-width="1.5"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                ></path>
                <path
                  id="epiKf9BF41354"
                  d="M89.8 410.1v-19l82.5 19.1v19l-82.5-19.1z"
                  fill="#11BC92"
                  stroke="#02E2AC"
                  stroke-width="1.5"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                ></path>
                <path
                  id="epiKf9BF41355"
                  d="M172.3 429.3v-19l104-9.1v19l-104 9.1z"
                  fill="#5BF1CD"
                  stroke="#02E2AC"
                  stroke-width="1.5"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                ></path>
                <path
                  id="epiKf9BF41356"
                  d="M276.3 401.2l-104 9.1-82.5-19.1 21.6-28.3 104.1-9.1 82.4 19.2-21.6 28.2z"
                  fill="#E0FFF2"
                  stroke="#02E2AC"
                  stroke-width="1.5"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                ></path>
                <path
                  id="epiKf9BF41357"
                  d="M227.5 383.8c-2.2 2.8-8.6 5.5-14.4 6l-16.5 1.4c-5.8.5-15.1-.1-20.8-1.5l-9.2-2.1c-5.6-1.3-8.5-4.7-6.4-7.5 2.1-2.8 8.6-5.5 14.4-6l16.5-1.4c5.8-.5 15.1.1 20.8 1.5l9.2 2.1c5.6 1.4 8.5 4.7 6.4 7.5z"
                  fill="#5BF1CD"
                  stroke="none"
                  stroke-width="1"
                ></path>
                <g
                  id="epiKf9BF41358"
                  stroke-width="1"
                  transform="matrix(1 0 0 1 0 -7.64288329999999)"
                  className="animate-bounce"
                >
                  <path
                    id="epiKf9BF41359"
                    d="M239.6 323.8l-13.2-58.4c-.1-.6-4-14.2-31.2-12.7-25.4 1.5-27.1 8.5-27.2 9.8l-13.2 59s-3 15.9 17.1 26c0 0 12.7 7.4 41.1 2.1 0 0 16.6-4 23.2-9.1 6.7-5 3.4-16.7 3.4-16.7z"
                    fill="#E9E1FF"
                    stroke="none"
                  ></path>
                  <path
                    id="epiKf9BF41360"
                    d="M156 315.1c1.6 1.1 21 18 39.9 13 2.8-.9 5-3.3 5.6-6l1.6-7.2c.5-1.8 2.9-5 8.3-4.5 7.3.7 25.1 1.5 25.3 1.5l3.9 16.2s.8 10.1-7.5 14.4c-8.3 4.2-27.6 12.5-53.5 7.7-31.2-5.8-23.6-35.1-23.6-35.1z"
                    fill="#6F3FF5"
                    stroke="none"
                  ></path>
                  <path
                    id="epiKf9BF41361"
                    d="M152.6 339.1c-.4.2-.9.4-1.4.5-1.4.3-2.8-.1-4-1l-5.5-4.2c-1.1-.9-1.8-2.2-1.8-3.4 0-1.1.5-2.1 1.4-2.8l8.7-6.4c1.6-1.1 3.9-1 5.6.3l1.9 1.5c1.7 1.3 2.3 3.4 1.4 5.1l-5.1 9.2c-.2.5-.6.9-1.2 1.2z"
                    fill="#FFF"
                    stroke="#8C65F7"
                    stroke-miterlimit="10"
                  ></path>
                  <path
                    id="epiKf9BF41362"
                    d="M250.6 339.5l-1.2.6-6.9 2.2c-1.5.5-3 .3-4.2-.4-1-.6-1.7-1.5-1.8-2.6l-1.3-10.6c-.2-1.9 1.1-3.7 3.3-4.4l2.4-.8c2.2-.7 4.4 0 5.5 1.7l5.8 9.2c.6 1 .7 2.1.3 3.1-.3.7-1 1.5-1.9 2z"
                    fill="#FFF"
                    stroke="#8C65F7"
                    stroke-miterlimit="10"
                  ></path>
                  <path
                    id="epiKf9BF41363"
                    d="M207.2 364c-.9.6-1.9.9-3 .9l-9.7.3c-1.7 0-3.4-.6-4.5-1.8-1.1-1.2-1.7-2.8-1.4-4.5l2.6-16.2c.4-2.6 2.8-4.5 5.6-4.6l3.3-.1c2.8-.1 5.3 1.7 5.9 4.3l3.7 16c.4 1.6 0 3.2-1.1 4.5-.4.5-.9.9-1.4 1.2z"
                    fill="#FFF"
                    stroke="#8C65F7"
                    stroke-miterlimit="10"
                  ></path>
                  <path
                    id="epiKf9BF41364"
                    d="M236.9 340.1c-1.2 1-1.4 1.1-3.1 2.1-5.5 3.4-13.9 6.8-26.6 8.5"
                    fill="none"
                    stroke="#8C65F7"
                    stroke-miterlimit="10"
                  ></path>
                  <path
                    id="epiKf9BF41365"
                    d="M189.7 351.5c-23.7-1-30.4-13.8-33.1-19.9"
                    fill="none"
                    stroke="#8C65F7"
                    stroke-miterlimit="10"
                  ></path>
                  <path
                    id="epiKf9BF41366"
                    d="M154.9 321.6l13.2-59c.1-1.3 1.8-8.3 27.2-9.8 27.2-1.6 31 12.1 31.2 12.7l13.2 58.4"
                    fill="none"
                    stroke="#8C65F7"
                    stroke-miterlimit="10"
                  ></path>
                  <path
                    id="epiKf9BF41367"
                    d="M183.9 290.3c-1.4-.8-3.2-.4-4.3.7-1.1 1.1-1.4 2.8-1 4.4.4 1.5 1.5 2.8 2.8 3.7.6.4 1.1.7 1.8.7 1.2.1 2.3-.7 3.3-1.4.3-.2.5-.4.7-.7.2-.3.3-.6.4-1 .5-2.8-3.5-6.8-3.7-6.4z"
                    fill="#FFF"
                    stroke="none"
                  ></path>
                  <path
                    id="epiKf9BF41368"
                    d="M170.2 285.3c-1.1.2-2.1.5-2.9 1.1-.7.6-1.1 1.3-1.6 2.1-1.8 3.8-1.7 8.2-2.1 12.4-.1.9-.2 1.8 0 2.8.1.5.3 1 .6 1.5.4.7.9 1.3 1.6 1.7 1.3.8 3 .6 4.3-.2 1.3-.8 2.2-2.2 2.7-3.6s.8-2.9 1.1-4.4c.4-2 .9-4 .8-6.1 0-1-.1-1.9-.3-2.8 0-.7-.2-1.6-.3-2.3-.1-.6 0-1.4-.2-1.9-.5-1.2-2.8-.5-3.7-.3z"
                    fill="#FFF"
                    stroke="none"
                  ></path>
                  <path
                    id="epiKf9BF41369"
                    d="M164.1 280.6l-5.7 27s25.3 15 29.5 5.1c4.2-10 4.1-19.6 4.1-19.6s1-6.2-27.9-12.5zm7.8 10.3l-2.9 12.2c-.4 1.5-1.7 2.5-3.1 2.2-.6-.1-1.1-.5-1.4-.9-.4-.6-.6-1.4-.4-2.3l2.9-12.2c.4-1.5 1.7-2.5 3.1-2.2.6.1 1.1.5 1.4.9.4.6.6 1.4.4 2.3zm14.6 4.5c-.5 1.3-2.4 1.9-4.2 1.3-1.8-.6-2.8-2.2-2.3-3.5.5-1.3 2.4-1.9 4.2-1.3 1.7.6 2.8 2.2 2.3 3.5z"
                    fill="#6F3FF5"
                    stroke="none"
                  ></path>
                  <path
                    id="epiKf9BF41370"
                    d="M221 266.5c-.1.1-1.3 2-4.5 3.9-3.4 2.1-9.3 4.4-18.6 4.9-17.5 1-24.3-7.7-24.6-8.1"
                    fill="none"
                    stroke="#8C65F7"
                    stroke-miterlimit="10"
                  ></path>
                  <path
                    id="epiKf9BF41371"
                    d="M156.3 315.2c1.6 1.1 21 18 39.9 13 2.8-.9 5-3.3 5.6-6l1.6-7.2c.5-1.8 2.9-5 8.3-4.5 7.3.7 25.1 1.5 25.3 1.5"
                    fill="none"
                    stroke="#8C65F7"
                    stroke-miterlimit="10"
                  ></path>
                  <path
                    id="epiKf9BF41372"
                    d="M197.6 229.9c2.6 0 4.7-2.1 4.7-4.7s-2.1-4.7-4.7-4.7-4.7 2.1-4.7 4.7c-.1 2.6 2.1 4.7 4.7 4.7z"
                    fill="#6F3FF5"
                    stroke="none"
                  ></path>
                  <path
                    id="epiKf9BF41373"
                    d="M195.2 263.8l2.2-34.1"
                    fill="none"
                    stroke="#8C65F7"
                    stroke-miterlimit="10"
                  ></path>
                  <path
                    id="epiKf9BF41374"
                    d="M198.9 263.3c-.8.5-2.2.7-3.7.5-2.5-.4-4.1-1.6-3.9-3 .2-1.4 2.2-2.1 4.6-1.7 1 .1 1.9.5 2.6.9.9.6 1.4 1.3 1.3 2.1-.1.4-.4.8-.9 1.2z"
                    fill="none"
                    stroke="#8C65F7"
                    stroke-miterlimit="10"
                  ></path>
                  <path
                    id="epiKf9BF41378"
                    d="M218.4 303.9c1.2 0 2.2-.9 2.2-2.1 0-1.1-1-2.1-2.2-2.1-1.2 0-2.3.9-2.3 2.1 0 1.2 1.1 2.1 2.3 2.1z"
                    fill="#6F3FF5"
                    stroke="none"
                  ></path>
                  <path
                    id="epiKf9BF41379"
                    d="M216.7 292.7c1.2 0 2.2-.9 2.2-2.1 0-1.2-1-2.1-2.2-2.1-1.2 0-2.2 1-2.2 2.1s1 2.1 2.2 2.1z"
                    fill="#6F3FF5"
                    stroke="none"
                  ></path>
                  <path
                    id="epiKf9BF41380"
                    d="M217 282.8c1.2 0 2.2-1 2.2-2.1s-1-2.1-2.2-2.1c-1.2 0-2.3.9-2.3 2.1 0 1.1 1 2.1 2.3 2.1z"
                    fill="#6F3FF5"
                    stroke="none"
                  ></path>
                  <path
                    id="epiKf9BF41381"
                    d="M198.9 368.4l.1-4"
                    fill="none"
                    stroke="#8C65F7"
                    stroke-miterlimit="10"
                  ></path>
                  <path
                    id="epiKf9BF41382"
                    d="M205.4 369.3h-12.5"
                    fill="none"
                    stroke="#8C65F7"
                    stroke-miterlimit="10"
                  ></path>
                  <path
                    id="epiKf9BF41383"
                    d="M247.1 344.4l-1-3.8"
                    fill="none"
                    stroke="#8C65F7"
                    stroke-miterlimit="10"
                  ></path>
                  <path
                    id="epiKf9BF41384"
                    d="M240.6 346.9l12.1-3.1"
                    fill="none"
                    stroke="#8C65F7"
                    stroke-miterlimit="10"
                  ></path>
                  <path
                    id="epiKf9BF41385"
                    d="M141.4 339.3l2.7-3.1"
                    fill="none"
                    stroke="#8C65F7"
                    stroke-miterlimit="10"
                  ></path>
                  <path
                    id="epiKf9BF41386"
                    d="M136 335.8l9.9 7.1"
                    fill="none"
                    stroke="#8C65F7"
                    stroke-miterlimit="10"
                  ></path>
                </g>
                <path
                  id="epiKf9BF41387"
                  d="M330.7 337.8v97.6"
                  fill="none"
                  stroke="#02E2AC"
                  stroke-width="1"
                  stroke-miterlimit="10"
                ></path>
                <path
                  id="epiKf9BF41388"
                  d="M165.2 449.9V343.2"
                  fill="none"
                  stroke="#02E2AC"
                  stroke-width="1"
                  stroke-miterlimit="10"
                ></path>
                <path
                  id="epiKf9BF41389"
                  d="M34 426.9V320.1"
                  fill="none"
                  stroke="#5BF1CD"
                  stroke-width="1"
                  stroke-miterlimit="10"
                ></path>
                <path
                  id="epiKf9BF41390"
                  d="M365.1 398.5v-95.1"
                  fill="none"
                  stroke="#02E2AC"
                  stroke-width="1"
                  stroke-miterlimit="10"
                ></path>
                <path
                  id="epiKf9BF41391"
                  d="M233.6 287.1L365 303.5l-34.4 34.4-165.5 5.3L34 320.1l35.8-16.7L160 292"
                  fill="none"
                  stroke="#02E2AC"
                  stroke-width="1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                ></path>
              </g>
            </g>
          </svg>
        </div>
        <div className="flex flex-row justify-center items-center">
          <div className="p-2 mt-4">
            <GoogleLogin
              clientId="417218034938-8e9v773muol74u0to36p5khrhpgubm76.apps.googleusercontent.com"
              onSuccess={props.responseGoogle}
              onFailure={props.responseGoogle}
              buttonText="Sign in with Google"
              cookiePolicy={"single_host_origin"}
              isSignedIn={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailLogin;
