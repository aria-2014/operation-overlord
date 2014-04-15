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
        //
        // GET: /ARIA001/


        static private List<Models.ARIA001> branches = new List<Models.ARIA001>()
			{
				new Models.ARIA001 {ID = 1, Name = "BranchIFSC", Age = 13, Gender = "Female", Handedness = "None", SpayedNeutered=true, Notes="Dublin 1"},
				new Models.ARIA001 {ID = 2, Name = "BranchSwords", Age = 9, Gender = "Female", Handedness = "Left", SpayedNeutered=true, Notes="Co. Dublin"},
				new Models.ARIA001 {ID = 3, Name = "BranchAthlone", Age = 10, Gender = "Female", Handedness = "None", SpayedNeutered=true, Notes="Co. Westmeath"},
				new Models.ARIA001 {ID = 4, Name = "BranchTramore", Age = 3, Gender = "Male", Handedness = "None", SpayedNeutered=true, Notes="Co. Waterford"},
				new Models.ARIA001 {ID = 5, Name = "BranchSandyford", Age = 4, Gender = "Female", Handedness = "None", SpayedNeutered=true, Notes="Dublin 18"},
				new Models.ARIA001 {ID = 6, Name = "BranchLetterKenny", Age = 14, Gender = "Female", Handedness = "Right", SpayedNeutered=true, Notes="Donegal"}
			};

        static private List<Models.locations> locations = new List<Models.locations>()
			{
				new Models.locations {title = "Current Position",   lat = 0.0,              lng = 0.0},
                new Models.locations {title = "Shop 1",             lat = 53.890542,        lng = -8.274856},
                new Models.locations {title = "Shop 2",             lat = 53.923036,        lng = -8.259052},
                new Models.locations {title = "Shop 3",             lat = 52.028249,        lng = -8.157507},
                new Models.locations {title = "Shop 4",             lat = 53.8001012865707, lng = -8.28747820854187},
                new Models.locations {title = "Shop 5",             lat = 53.950198,        lng = -8.259302}
			};



        //
        // GET: /branch/

        public ActionResult Index()
        {
            return View(branches);

            //ViewData.Model = branches;
            //return View();
        }

        //
        // GET: /branch/Details/5

        public ActionResult Details(Models.ARIA001 d)
        {
            return View(d);
        }

        private List<SelectListItem> handed = new List<SelectListItem> {
						new SelectListItem { Text = "Left", Value = "Left" },
						new SelectListItem { Text = "Right", Value = "Right" },
						new SelectListItem { Text = "None", Value = "None" }
			};

        //
        // GET: /branch/Create

        public ActionResult Create()
        {
            ViewData["HandedList"] = new SelectList(handed, "Value", "Text");
            return View();
        }

        //
        // POST: /branch/Create

        [HttpPost]
        public ActionResult Create(Models.ARIA001 d)
        {
            ViewData["HandedList"] = new SelectList(handed, "Value", "Text");

            if (!ModelState.IsValid)
            {
                return View("Create", d);
            }
            branches.Add(d);

            return RedirectToAction("Index");
        }

        //
        // GET: /branch/Edit/5

        public ActionResult Edit(int id)
        {
            ViewData["HandedList"] = new SelectList(handed, "Value", "Text");

            Models.ARIA001 d = new Models.ARIA001();
            foreach (Models.ARIA001 branch in branches)
            {
                if (branch.ID == id)
                {
                    d.Name = branch.Name;
                    d.Age = branch.Age;
                    d.ID = branch.ID;
                    d.Handedness = branch.Handedness;
                    d.Gender = branch.Gender;
                    d.SpayedNeutered = branch.SpayedNeutered;
                    d.Notes = branch.Notes;
                }
            }
            return View(d);
        }

        //
        // POST: /branch/Edit/5

        [HttpPost]
        public ActionResult Edit(Models.ARIA001 d)
        {
            ViewData["HandedList"] = new SelectList(handed, "Value", "Text");

            if (!ModelState.IsValid)
            {
                return View("Edit", d);
            }

            foreach (Models.ARIA001 branch in branches)
            {
                if (branch.ID == d.ID)
                {
                    branch.Name = d.Name;
                    branch.Age = d.Age;
                    branch.Handedness = d.Handedness;
                    branch.Gender = d.Gender;
                    branch.SpayedNeutered = d.SpayedNeutered;
                    branch.Notes = d.Notes;
                }
            }
            return RedirectToAction("Index");
        }

        //
        // POST: /branch/Delete/5
        [HttpPost]
        public ActionResult Delete(int id)
        {
            foreach (Models.ARIA001 branch in branches)
            {
                if (branch.ID == id)
                {
                    branches.Remove(branch);
                    break;
                }
            }
            return RedirectToAction("Index");
        }

        [ChildActionOnly]
        public string AppDev()
        {
            // Used for Html.Action (more typically use a partial view)
            return "<a href='http://www.appdev.com'>Go to AppDev</a>";
        }

        public ActionResult GetDog()
        {
            // Build a Dictionary with branch names and IDs
            Dictionary<string, int> dogNames = new Dictionary<string, int>();
            foreach (Models.ARIA001 branch in branches)
            {
                dogNames.Add(branch.Name, branch.ID);
            }

            return View(dogNames);
        }

        public ActionResult GetDogDetails(int id)
        {
            StringBuilder sb = new StringBuilder();
            foreach (Models.ARIA001 branch in branches)
            {
                if (branch.ID == id)
                {
                    sb.Append("Name: <b>" + branch.Name + "</b><br/><br/>");
                    sb.Append("Age: <b>" + branch.Age + "</b><br/><br/>");
                    sb.Append("Gender: <b>" + branch.Gender + "</b><br/><br/>");
                    sb.Append("Handedness: <b>" + branch.Handedness + "</b><br/><br/>");
                    sb.Append("Spayed/Neutered: <b>" + branch.SpayedNeutered + "</b><br/><br/>");
                    sb.Append("Notes: <b>" + branch.Notes + "</b><br/><br/>");
                }
            }
            return Content(sb.ToString());
        }

        //public ActionResult GetDogDetails(int? id)
        //{
        //   StringBuilder sb = new StringBuilder();
        //   if (id.HasValue)
        //   {
        //      foreach (Models.branch branch in branches)
        //      {
        //         if (branch.ID == id)
        //         {
        //            sb.Append("Name: <b>" + branch.Name + "</b><br/><br/>");
        //            sb.Append("Age: <b>" + branch.Age + "</b><br/><br/>");
        //            sb.Append("Gender: <b>" + branch.Gender + "</b><br/><br/>");
        //            sb.Append("Handedness: <b>" + branch.Handedness + "</b><br/><br/>");
        //            sb.Append("Spayed/Neutered: <b>" + branch.SpayedNeutered + "</b><br/><br/>");
        //            sb.Append("Notes: <b>" + branch.Notes + "</b><br/><br/>");
        //         }
        //      }
        //   }
        //   else
        //   {
        //      sb.Append("Please select a value from the list, then try again.");
        //   }

        //   return Content(sb.ToString());
        //}

        public ActionResult GetDogForm()
        {
            // Build a List<SelectListItem> to hold branch names and IDs
            List<SelectListItem> dogNames = new List<SelectListItem>();
            foreach (Models.ARIA001 branch in branches)
            {
                dogNames.Add(new SelectListItem { Text = branch.Name, Value = branch.ID.ToString() });
            }
            ViewData["DogNames"] = new SelectList(dogNames, "Value", "Text");

            return View();
        }

        public ActionResult GetDogList()
        {
            return View();
        }

        public ActionResult GetDogListJSON()
        {
            //return Json(branches);
            return Json(branches, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetLocationsJSON()
        {
            //return Json(branches);
            return Json(locations, JsonRequestBehavior.AllowGet);
        }


    }
}
