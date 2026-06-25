Question 1:

    Hello Marissa,

        Thank you for the feedback, I know redesigns can be very frustrating and I am going to relay your concerns to the product team asap. In the meantime let's get a call together and I can walk you through some methods on the cli and API to alleviate the current pain points at the moment and allow you to continue iterating without the added effort of going through the dashboard.

    Best,
    Andrew

Question 2:

    Hi Carrie,

        Your errors are mostly likely tied to the extra metadata being added, which are inflating the size of each record. Generally we recommend only having attributes in algolia that are relevant to the search functionality. Refer to this support article about the issue you're having https://support.algolia.com/hc/en-us/articles/4406981897617-Is-there-a-size-limit-for-my-index-records. To get yourself up and running again I'd recommend immediately removing that unnecessary metadata, I am available for a call today to assist you with the audit of record attributes. Let me know what time works best for you.

    Thanks, 
    Andrew

Question 3:

    Hi Marc,

        The error seems to be coming from a module called "searchKit" that is either not imported correctly or not installed. That being said it seems that there might be some confusion on the architecture of your Algolia implementation. SearchKit is generally used as an adapter for outside data (Elastisearch or Opensearch) to utilize the instantsearch widgets from Algolia. If you haven't migrated all your data yet, I'd recommend moving everything into an Algolia index so that searchKit isn't necessary. If your data has already been migrated to Algolia, you can remove searchKit and utilize the instantsearch widgets directly.

        Let me know if you have any questions to follow up on or if you'd like to jump on a call regarding this.

        Thanks,
        Andrew