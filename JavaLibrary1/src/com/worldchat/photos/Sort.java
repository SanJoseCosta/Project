
package com.worldchat.photos;


import java.util.ArrayList;

public class Sort
{
    public static ArrayList sort(ArrayList a)                                     
    {
	    int n = a.size();
	        
		ISortable[] objs = new ISortable[n];
		
		for ( int i = 0; i < n; ++i )
			objs[i] = (ISortable) a.get(i);
		
		(new Sort()).sort(objs);
		
		ArrayList vo = new ArrayList();
		
		for ( int i = 0; i < n; ++i )
			vo.add(objs[i]);
		
		return vo;
    }
	
   
   /** This is a generic version of C.A.R Hoare's Quick Sort
    * algorithm.  This will handle arrays that are already
    * sorted, and arrays with duplicate keys.<BR>
    *
    * If you think of a one dimensional array as going from
    * the lowest index on the left to the highest index on the right
    * then the parameters to this function are lowest index or
    * left and highest index or right.  The first time you call
    * this function it will be with the parameters 0, a.length - 1.
    *
    * @param a       an integer array
    * @param lo0     left boundary of array partition
    * @param hi0     right boundary of array partition
    */
	
	
   private void QuickSort(ISortable a[], int lo0, int hi0)
   {
      int lo = lo0;
      int hi = hi0;
      ISortable mid;

      if ( hi0 > lo0 )
      {

         /* Arbitrarily establishing partition element as the midpoint of
          * the array.
          */
         mid = a[ ( lo0 + hi0 ) / 2 ];

         // loop through the array until indices cross
         while( lo <= hi )
         {
            /* find the first element that is greater than or equal to
             * the partition element starting from the left Index.
             */
	     while( ( lo < hi0 ) && ( a[lo].compareTo(mid) < 0 ) )
		 ++lo;

            /* find an element that is smaller than or equal to
             * the partition element starting from the right Index.
             */
	     while( ( hi > lo0 ) && ( a[hi].compareTo(mid) > 0 ) )
		 --hi;

            // if the indexes have not crossed, swap
            if( lo <= hi )
            {
               swap(a, lo, hi);
               ++lo;
               --hi;
            }
         }

         /* If the right index has not reached the left side of array
          * must now sort the left partition.
          */
         if( lo0 < hi )
            QuickSort( a, lo0, hi );

         /* If the left index has not reached the right side of array
          * must now sort the right partition.
          */
         if( lo < hi0 )
            QuickSort( a, lo, hi0 );

      }
   }

   private void swap(ISortable a[], int i, int j)
   {
      ISortable T;
      T = a[i];
      a[i] = a[j];
      a[j] = T;
   }

   public void sort(ISortable a[])
   {
      QuickSort(a, 0, a.length - 1);
   }
}

