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


        static private List<Models.ARIA001> dogs = new List<Models.ARIA001>()
			{
				new Models.ARIA001 {ID = 1, Name = "Mardy", Age = 13, Gender = "Female", Handedness = "None", SpayedNeutered=true, Notes="Beautiful Irish Setter."},
				new Models.ARIA001 {ID = 2, Name = "Izzi", Age = 9, Gender = "Female", Handedness = "Left", SpayedNeutered=true, Notes="Karelian Bear Dog, but not trained for field work."},
				new Models.ARIA001 {ID = 3, Name = "Jewel", Age = 10, Gender = "Female", Handedness = "None", SpayedNeutered=true, Notes="Basenji/Doberman mix with short hair. Why isn't she in Africa where it is warm?"},
				new Models.ARIA001 {ID = 4, Name = "Copper", Age = 3, Gender = "Male", Handedness = "None", SpayedNeutered=true},
				new Models.ARIA001 {ID = 5, Name = "Onyx", Age = 4, Gender = "Female", Handedness = "None", SpayedNeutered=true, Notes="Underweight, suffering from a severe bowel disorder."},
				new Models.ARIA001 {ID = 6, Name = "Raja", Age = 14, Gender = "Female", Handedness = "Right", SpayedNeutered=true, Notes="Older than we first thought, but still loves to run."}
			};

        //
        // GET: /Dog/

        public ActionResult Index()
        {
            return View(dogs);

            //ViewData.Model = dogs;
            //return View();
        }

        //
        // GET: /Dog/Details/5

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
        // GET: /Dog/Create

        public ActionResult Create()
        {
            ViewData["HandedList"] = new SelectList(handed, "Value", "Text");
            return View();
        }

        //
        // POST: /Dog/Create

        [HttpPost]
        public ActionResult Create(Models.ARIA001 d)
        {
            ViewData["HandedList"] = new SelectList(handed, "Value", "Text");

            if (!ModelState.IsValid)
            {
                return View("Create", d);
            }
            dogs.Add(d);

            return RedirectToAction("Index");
        }

        //
        // GET: /Dog/Edit/5

        public ActionResult Edit(int id)
        {
            ViewData["HandedList"] = new SelectList(handed, "Value", "Text");

            Models.ARIA001 d = new Models.ARIA001();
            foreach (Models.ARIA001 dog in dogs)
            {
                if (dog.ID == id)
                {
                    d.Name = dog.Name;
                    d.Age = dog.Age;
                    d.ID = dog.ID;
                    d.Handedness = dog.Handedness;
                    d.Gender = dog.Gender;
                    d.SpayedNeutered = dog.SpayedNeutered;
                    d.Notes = dog.Notes;
                }
            }
            return View(d);
        }

        //
        // POST: /Dog/Edit/5

        [HttpPost]
        public ActionResult Edit(Models.ARIA001 d)
        {
            ViewData["HandedList"] = new SelectList(handed, "Value", "Text");

            if (!ModelState.IsValid)
            {
                return View("Edit", d);
            }

            foreach (Models.ARIA001 dog in dogs)
            {
                if (dog.ID == d.ID)
                {
                    dog.Name = d.Name;
                    dog.Age = d.Age;
                    dog.Handedness = d.Handedness;
                    dog.Gender = d.Gender;
                    dog.SpayedNeutered = d.SpayedNeutered;
                    dog.Notes = d.Notes;
                }
            }
            return RedirectToAction("Index");
        }

        //
        // POST: /Dog/Delete/5
        [HttpPost]
        public ActionResult Delete(int id)
        {
            foreach (Models.ARIA001 dog in dogs)
            {
                if (dog.ID == id)
                {
                    dogs.Remove(dog);
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
            // Build a Dictionary with dog names and IDs
            Dictionary<string, int> dogNames = new Dictionary<string, int>();
            foreach (Models.ARIA001 dog in dogs)
            {
                dogNames.Add(dog.Name, dog.ID);
            }

            return View(dogNames);
        }

        public ActionResult GetDogDetails(int id)
        {
            StringBuilder sb = new StringBuilder();
            foreach (Models.ARIA001 dog in dogs)
            {
                if (dog.ID == id)
                {
                    sb.Append("Name: <b>" + dog.Name + "</b><br/><br/>");
                    sb.Append("Age: <b>" + dog.Age + "</b><br/><br/>");
                    sb.Append("Gender: <b>" + dog.Gender + "</b><br/><br/>");
                    sb.Append("Handedness: <b>" + dog.Handedness + "</b><br/><br/>");
                    sb.Append("Spayed/Neutered: <b>" + dog.SpayedNeutered + "</b><br/><br/>");
                    sb.Append("Notes: <b>" + dog.Notes + "</b><br/><br/>");
                }
            }
            return Content(sb.ToString());
        }

        //public ActionResult GetDogDetails(int? id)
        //{
        //   StringBuilder sb = new StringBuilder();
        //   if (id.HasValue)
        //   {
        //      foreach (Models.Dog dog in dogs)
        //      {
        //         if (dog.ID == id)
        //         {
        //            sb.Append("Name: <b>" + dog.Name + "</b><br/><br/>");
        //            sb.Append("Age: <b>" + dog.Age + "</b><br/><br/>");
        //            sb.Append("Gender: <b>" + dog.Gender + "</b><br/><br/>");
        //            sb.Append("Handedness: <b>" + dog.Handedness + "</b><br/><br/>");
        //            sb.Append("Spayed/Neutered: <b>" + dog.SpayedNeutered + "</b><br/><br/>");
        //            sb.Append("Notes: <b>" + dog.Notes + "</b><br/><br/>");
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
            // Build a List<SelectListItem> to hold dog names and IDs
            List<SelectListItem> dogNames = new List<SelectListItem>();
            foreach (Models.ARIA001 dog in dogs)
            {
                dogNames.Add(new SelectListItem { Text = dog.Name, Value = dog.ID.ToString() });
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
            //return Json(dogs);
            return Json(dogs, JsonRequestBehavior.AllowGet);
        }


    }
}
