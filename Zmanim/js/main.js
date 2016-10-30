﻿// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509


(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            WinJS.Utilities.query("a").listen("click", linkClickEventHandler, false);

        }
    });

    function linkClickEventHandler(eventInfo) {
        eventInfo.preventDefault();
        var link = eventInfo.target;
        WinJS.Navigation.navigate(link.href);
    }


})();


(function () {
	"use strict";

	var app = WinJS.Application;
	var activation = Windows.ApplicationModel.Activation;
	var isFirstActivation = true;
   
	app.onactivated = function (args) {
        
WinJS.Namespace.define("Sample", {
    mode: {
        small: {
            name: 'small',
            openedDisplayMode: WinJS.UI.SplitView.OpenedDisplayMode.overlay,
            closedDisplayMode: WinJS.UI.SplitView.ClosedDisplayMode.none,
        },
        medium: {
            name: 'medium',
            openedDisplayMode: WinJS.UI.SplitView.OpenedDisplayMode.overlay,
            closedDisplayMode: WinJS.UI.SplitView.ClosedDisplayMode.inline,
        },
        large: {
            name: 'large',
            openedDisplayMode: WinJS.UI.SplitView.OpenedDisplayMode.inline,
            closedDisplayMode: WinJS.UI.SplitView.ClosedDisplayMode.inline,
        }
    },
    splitView: null,
    radioChanged: WinJS.UI.eventHandler(function (ev) {
        var mode = event.target.value;
        Sample.updateSplitView(mode);
    }),
    updateSplitView: function (size) {
        // Remove all the size classes
        Object.keys(Sample.mode).forEach(function (key) {
            WinJS.Utilities.removeClass(Sample.host, Sample.mode[key].name);
        });

        // Update the SplitView based on the size
        Sample.splitView.openedDisplayMode = Sample.mode[size].openedDisplayMode;
        Sample.splitView.closedDisplayMode = Sample.mode[size].closedDisplayMode;

        // Add the size class
        WinJS.Utilities.addClass(Sample.host, size);
    }
});

WinJS.Binding.processAll(null, Sample).then(function () {
    WinJS.UI.processAll().done(function () {
        Sample.splitView = document.querySelector(".splitView").winControl;
        Sample.host = document.querySelector("#app");

        // Temporary workaround: Draw keyboard focus visuals on NavBarCommands
        new WinJS.UI._WinKeyboard(Sample.splitView.paneElement);
    });
})





Sample.updateSplitView('small');

WinJS.Navigation.navigate("/pages/home.html");






		if (args.detail.kind === activation.ActivationKind.voiceCommand) {
			// TODO: Handle relevant ActivationKinds. For example, if your app can be started by voice commands,
			// this is a good place to decide whether to populate an input field or choose a different initial view.
		}
		else if (args.detail.kind === activation.ActivationKind.launch) {
			// A Launch activation happens when the user launches your app via the tile
			// or invokes a toast notification by clicking or tapping on the body.
			if (args.detail.arguments) {
				// TODO: If the app supports toasts, use this value from the toast payload to determine where in the app
				// to take the user in response to them invoking a toast notification.
			}
			else if (args.detail.previousExecutionState === activation.ApplicationExecutionState.terminated) {
				// TODO: This application had been suspended and was then terminated to reclaim memory.
				// To create a smooth user experience, restore application state here so that it looks like the app never stopped running.
				// Note: You may want to record the time when the app was last suspended and only restore state if they've returned after a short period.
			}
		}

		if (!args.detail.prelaunchActivated) {
			// TODO: If prelaunchActivated were true, it would mean the app was prelaunched in the background as an optimization.
			// In that case it would be suspended shortly thereafter.
			// Any long-running operations (like expensive network or disk I/O) or changes to user state which occur at launch
			// should be done here (to avoid doing them in the prelaunch case).
			// Alternatively, this work can be done in a resume or visibilitychanged handler.
		}

		if (isFirstActivation) {
			// TODO: The app was activated and had not been running. Do general startup initialization here.
			document.addEventListener("visibilitychange", onVisibilityChanged);
			args.setPromise(WinJS.UI.processAll());
		}

		isFirstActivation = false;
	};

	function onVisibilityChanged(args) {
		if (!document.hidden) {
			// TODO: The app just became visible. This may be a good time to refresh the view.
		}
	}

	app.oncheckpoint = function (args) {
		// TODO: This application is about to be suspended. Save any state that needs to persist across suspensions here.
		// You might use the WinJS.Application.sessionState object, which is automatically saved and restored across suspension.
		// If you need to complete an asynchronous operation before your application is suspended, call args.setPromise().
	};

	app.start();

})();


window.addEventListener("resize", onResize);


function onResize(eventArgs) {
    var appWidth = eventArgs.view.outerWidth;
    var appHeight = eventArgs.view.outerHeight;
    // Update view for the new window size 
    updateView(appWidth);
}

function updateView(appWidth) {
    if (appWidth < 900) {
        //Sample.splitView.openedDisplayMode = Sample.mode['small'].openedDisplayMode;
        //Sample.splitView.closedDisplayMode = Sample.mode['small'].closedDisplayMode;
        Sample.updateSplitView('small');
    } else {
        //Sample.splitView.openedDisplayMode = Sample.mode['medium'].openedDisplayMode;
        //Sample.splitView.closedDisplayMode = Sample.mode['medium'].closedDisplayMode;
        Sample.updateSplitView('medium');
    }
}


function navigateCalendar(eventArgs) {
    WinJS.Navigation.navigate("/pages/calendar.html");
    Sample.splitView.closePane();
}
function navigateHome(eventArgs) {
    WinJS.Navigation.navigate("/pages/home.html");
    Sample.splitView.closePane();
}

function navEvents(eventInfo) {
    navCommandCalendar.addEventListener("invoked", navigateCalendar);
    navCommandHome.addEventListener("invoked", navigateHome);
}

document.addEventListener('DOMContentLoaded', navEvents);