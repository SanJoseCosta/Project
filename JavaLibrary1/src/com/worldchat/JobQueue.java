package com.worldchat;

import java.util.ArrayList;

public class JobQueue 
{
	ArrayList<Job> jobs = new ArrayList<Job>();
	
	synchronized void add(Job j)
	{
		jobs.add(j);
	}
	
	synchronized Job get()
	{
		if (jobs.size() > 0)
		{
			Job j = jobs.get(0);
			jobs.remove(0);
			return j;
		}
		return null;
	}
}
