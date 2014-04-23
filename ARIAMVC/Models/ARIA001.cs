using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MvcApplication1.Models
{
    public class Branches
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Notes { get; set; }
    }

    public class Locations
    {
        public string title { get; set; }
        public double lat { get; set; }
        public double lng { get; set; }
    }

    public class PlacesToGo
    {
        public int ID { get; set; }
        public string Desc { get; set; }
    }

    public class ThingsToDo
    {
        public int ID { get; set; }
        public string Desc { get; set; }
    }

    public class WhereToStay
    {
        public int ID { get; set; }
        public string Desc { get; set; }
    }

    public class WhatsOn
    {
        public int ID { get; set; }
        public string Desc { get; set; }
    }

}