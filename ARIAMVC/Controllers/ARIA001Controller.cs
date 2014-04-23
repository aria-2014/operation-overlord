using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace MvcApplication1.Controllers
{
    public class ARIA001Controller : Controller
    {


        static private List<Models.Branches> branches = new List<Models.Branches>()
			{
				new Models.Branches {ID = 1, Name = "BranchIFSC", Notes="Dublin 1"},
				new Models.Branches {ID = 2, Name = "BranchSwords", Notes="Co. Dublin"},
				new Models.Branches {ID = 3, Name = "BranchAthlone", Notes="Co. Westmeath"},
				new Models.Branches {ID = 4, Name = "BranchTramore",  Notes="Co. Waterford"},
				new Models.Branches {ID = 5, Name = "BranchSandyford",  Notes="Dublin 18"},
				new Models.Branches {ID = 6, Name = "BranchLetterKenny",  Notes="Donegal"}
			};

        static private List<Models.Locations> locations = new List<Models.Locations>()
			{
				new Models.Locations {title = "Current Position",   lat = 0.0,              lng = 0.0},
                new Models.Locations {title = "Shop 1",             lat = 53.890542,        lng = -8.274856},
                new Models.Locations {title = "Shop 2",             lat = 53.923036,        lng = -8.259052},
                new Models.Locations {title = "Shop 3",             lat = 52.028249,        lng = -8.157507},
                new Models.Locations {title = "Shop 4",             lat = 53.8001012865707, lng = -8.28747820854187},
                new Models.Locations {title = "Shop 5",             lat = 53.950198,        lng = -8.259302}
			};

        static private List<Models.PlacesToGo> placesToGo = new List<Models.PlacesToGo>()
			{
				new Models.PlacesToGo {ID = 1, Desc = "<p>Dublin</p>"},
				new Models.PlacesToGo {ID = 2, Desc = "<p>Galway</p>"},
                new Models.PlacesToGo {ID = 3, Desc = "<p>Cork</p>"},
			};
        static private List<Models.ThingsToDo> thingsToDo = new List<Models.ThingsToDo>()
			{
				new Models.ThingsToDo {ID = 1, Desc = "<p>Theatre</p>"},
				new Models.ThingsToDo {ID = 2, Desc = "<p>Cinema</p>"},
                new Models.ThingsToDo {ID = 3, Desc = "<p>Pub</p>"},
			};

        static private List<Models.WhereToStay> whereToStay = new List<Models.WhereToStay>()
			{
				new Models.WhereToStay {ID = 1, Desc = "<p>Hotel</p>"},
				new Models.WhereToStay {ID = 2, Desc = "<p>B&B</p>"},
                new Models.WhereToStay {ID = 3, Desc = "<p>Guest House</p>"},
			};

        static private List<Models.WhatsOn> whatsOn = new List<Models.WhatsOn>()
			{
				new Models.WhatsOn {ID = 1, Desc = "<p>Football Match</p>"},
				new Models.WhatsOn {ID = 2, Desc = "<p>Music Festival</p>"},
                new Models.WhatsOn {ID = 3, Desc = "<p>Horse Racing</p>"},
			};



        public ActionResult Index()
        {
            //return View(branches);

            //ViewData.Model = branches;
            return View();
        }

        public ActionResult GetBranchesJSON()
        {
            return Json(branches, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetLocationsJSON()
        {
            return Json(locations, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetPlacesToGoJSON()
        {
            return Json(placesToGo, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetThingsToDoJSON()
        {
            return Json(thingsToDo, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetWhereToStayJSON()
        {
            return Json(whereToStay, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetWhatsOnJSON()
        {
            return Json(whatsOn, JsonRequestBehavior.AllowGet);
        }

    }
}
